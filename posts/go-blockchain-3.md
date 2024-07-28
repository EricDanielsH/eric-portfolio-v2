---
title: "Database Persistence and CLI Integration | Blockchain in Go: Part 3"
summary: "You will learn how to persist our blockchain data in a database using BoltDB. You will also create a simple command-line interface to interact with our blockchain."
date: "14 June 2024"
lastmod: "16 June 2024"
author: "Eric Daniels"
tags: ["go", "blockchain", "tutorial", "crypto"]
draft: false
---

# Introduction

So far, we've developed a blockchain with a proof-of-work system, enabling mining. Our implementation is approaching a fully functional blockchain but still lacks some crucial features. Today, we'll begin by storing the blockchain in a database and then create a simple command-line interface to interact with it. Essentially, a blockchain is a distributed database. For now, we'll set aside the "distributed" aspect and concentrate on the "database" component.

# Database

We currently store our blockchain in memory, which is not ideal for a production system. To address this, we'll use a simple key-value store to persist the blockchain data. For this tutorial, we'll use [BoltDB](https://github.com/boltdb/bolt)[^1] , a pure Go key-value store developed by Ben Johnson.

## BoltDB

In BoltDB, data is stored in buckets, which are similar to tables in a relational database. BoltDB is a lightweight, fast, and easy-to-use database that is well-suited for our blockchain implementation.

Data is stored as key-value pairs, just like an object in JavaScript or Golang maps. Key-value pairs are stored into buckets, which are similar to tables in a relational database, and group similar pairs. Thus, in order to retrieve a value, you need to know the key and the bucket where it is stored.

Another important aspect of BoltDB is that there are no data types. Everything is stored as a byte slice, so you need to _serialize_ and _deserialize_ your data when storing and retrieving it. For this task, we will use the [`encoding/gob`](https://pkg.go.dev/encoding/gob)[^2] package, which is part of the Go standard library. We need to use this package because to convert a struct into a byte slice, we can't simply cast it like any other type, e.g. `[]byte("a string")`. Instead, we need to save our struct into a buffer and then convert the buffer into a byte slice.

Because the official repository has been archived, we will use _bbolt_, a fork of BoltDB maintained by the etcd team. To install the package, run the following command:

```bash
go get go.etcd.io/bbolt
```

After installing _bbolt_, we can import it into our project:

```go
import "go.etcd.io/bbolt"
```

## Database Structure

The structure of our database will follow the way Bitcoin Core stores its blockchain data.
Bitcoin Core uses two main buckets:

- `blocks` stores the metadata about the blocks
- `chainstate` stores the state about the blockchain. This will include currently unspent transaction outputs (UTXOs) and other relevant metadata.

In our `blocks` bucket, our `key -> value` pairs will be:

1. `'b' + 32-byte block hash -> block index record`
2. `'f' + 4-byte file number -> file information record`
3. `'l' -> 4-byte file number: the last block file number used`
4. `'R' -> 1-byte boolean: whether we're in the process of reindexing`
5. `'F' + 1-byte flag name length + flag name string -> 1 byte boolean: various flags that can be on or off`
6. `'t' + 32-byte transaction hash -> transaction index record`

In the `chainstate` bucket, the `key -> value` pairs will be:

1. `'c' + 32-byte transaction hash -> unspent transaction output record for that transaction`
2. `'B' -> 32-byte block hash: the block hash up to which the database represents the unspent transaction outputs`

You can find more details about the Bitcoin Core database structure [here](<https://en.bitcoin.it/wiki/Bitcoin_Core_0.11_(ch_2):_Data_Storage>)[^3].

Because we are still not implementing transactions in our blockchain, we will only store the blocks data in our `blocks` bucket and database. Also, we will store the entire database in a single file, so we don't need to worry about file numbers.
The two main `key -> value` pairs that we will use are:

1. `32-byte block-hash -> Block structure (serialized)`
2. `'l' -> the hash of the last block in a chain`

This is all we need to know to start implementing our persistence mechanism using BoltDB.

# Serialisation & Deserialisation

Before we can store our blockchain in the database, we need to serialise and deserialise our `Block` structure into the `[]byte` type.

Let's implement the `Serialize` and `Deserialize` methods for our `Block` structure:

```go
func (b *Block) SerialiseBlock() []byte {
  // Create a buffer to hold the block information
  var buffer bytes.Buffer
  // Create an encoder that saves encodings into the buffer
  encoder := gob.NewEncoder(&buffer)
  // Encode the block, which will be saved in buffer. Returns error
  err := encoder.Encode(b)
  if err != nil {
    fmt.Print("Error while encoding block")
    os.Exit(1)
  }
  // Convert the enconding into a slices of bytes
  return buffer.Bytes()
}
```

This code:

1. Creates a buffer to hold the block information
2. Creates an encoder that saves encodings into the buffer.
3. Then, the block is encoded and saved in the buffer.
4. Finally, the encoding is converted into a slice of bytes.

Next, we need to implement the `DeserializeBlock` method:

```go
func  DeserialiseBlock(d []byte) *Block {
  // Create a block var where the data will be deserialised
  var block Block
  // Create a deserialiser that contains a reader with the data
  decoder := gob.NewDecoder(bytes.NewReader(d))
  // Decode data into the block var
  err := decoder.Decode(&block)
  if err != nil {
    fmt.Print("Error while dencoding block")
    os.Exit(1)
  }
  // Return the address of the block with the decoded data
  return &block
}
```

And that's it! We can now serialise and deserialise our `Block` structure. Very simple!

# Database Persistence Integration

We will need to modify our `NewBlockchain` function from the previous tutorial to include the database.
What is currently does, is create a new blockchain with a genesis block. What we want it to do is
to:

1. Open the database file
2. Check if we have a blockchain stored in the database
3. If we have a blockhain:
   1. Create a new `Blockchain` instant
   2. Set the `tip` to the last block hash stored in the database
4. If we don't have a blockchain:
   1. Create the genesis block
   2. Store it in the database
   3. Set the genesis block hash as the tip
   4. Create a new `Blockchain` instant with the tip set to the genesis block hash

> **Note:** The `tip` is stored for efficiency, state management and continuity.

First, we will need to update our `Blockchain` struct to include the database and the tip hash:

```go
type Blockchain struct {
	tip []byte
	db  *bbolt.DB
}
```

We store the database connetion because we want ot open it once and keep it open while the program is running to avoid the overhead of opening and closing the database every time we need to access it.

Next, we will update the `NewBlockchain` function to include the steps mentioned above:

```go
func NewBlockchain() *Blockchain {
	// Create var for the tip of the blockchain
	var tip []byte
	// Open the database connection (file, fileMode, otherOptions)
	db, err := bbolt.Open(dbFile, 0600, nil)

	if err != nil {
		fmt.Print("Error while opening the DB connection in blockchain creation")
		os.Exit(1)
	}

	// Write/Update the database
	err = db.Update(func(tx *bbolt.Tx) error {
		// Get a bucket from the database
		b := tx.Bucket([]byte(blocksBucket))

		// If the bucket doesn't exist
		if b == nil {
			// Generate a new GenesisBlock
			genesis := NewGenesisBlock()
			// Create a bucket with the blocksBucket key
			b, err = tx.CreateBucket([]byte(blocksBucket))
			if err != nil {
				fmt.Print("Error while creating new bucket in NewBlockchain()")
			}
			// Add the block data with the block hash as its key
			err = b.Put(genesis.Hash, genesis.SerialiseBlock())
			if err != nil {
				fmt.Print("Error while putting block into bucket")
				return errors.New("Error while putting block into bucket")
			}
			// Add the last hash with "l" key
			err = b.Put([]byte("l"), genesis.Hash)
			if err != nil {
				fmt.Print("Error while putting last hash into bucket")
				return errors.New("Error while putting last hash into bucket")
			}

		} else {
			// Get the last hash with the key "l"
			tip = b.Get([]byte("l"))
		}
		return nil

	})

	// Create a new blockchain pointer
	bc := &Blockchain{tip, db}

	return bc
}
```

Before we break down the code, we need to add the `blocksBucket` and the `dbFile` constant to our code:

```go
// Database file
const dbFile = "blockchain.db"
// Bucket name
const blocksBucket = "blocks"
```

Now, let's break down the code:

1. Initialize the `tip` Variable:

```go
var tip []byte
```

This line declares a variable to store the hash of the most recent block in the blockchain.

2. Open the Database Connection

```go
db, err := bbolt.Open(dbFile, 0600, nil)
if err != nil {
    fmt.Print("Error while opening the DB connection in blockchain creation")
    os.Exit(1)
}
```

- This opens a connection to the BoltDB database file specified by dbFile.
- If there's an error, it prints an error message and exits the program.

3. Update the Database:

```go
err = db.Update(func(tx *bbolt.Tx) error {
    // Get a bucket from the database
    b := tx.Bucket([]byte(blocksBucket))

    // If the bucket doesn't exist
    if b == nil {
        // Generate a new GenesisBlock
        genesis := NewGenesisBlock()
        // Create a bucket with the blocksBucket key
        b, err = tx.CreateBucket([]byte(blocksBucket))
        if err != nil {
            fmt.Print("Error while creating new bucket in NewBlockchain()")
        }
        // Add the block data with the block hash as its key
        err = b.Put(genesis.Hash, genesis.SerialiseBlock())
        if err != nil {
            fmt.Print("Error while putting block into bucket")
            return errors.New("Error while putting block into bucket")
        }
        // Add the last hash with "l" key
        err = b.Put([]byte("l"), genesis.Hash)
        if err != nil {
            fmt.Print("Error while putting last hash into bucket")
            return errors.New("Error while putting last hash into bucket")
        }

    } else {
        // Get the last hash with the key "l"
        tip = b.Get([]byte("l"))
    }
    return nil

})
```

- Open a read-write transaction on the database using Update.
- Access the bucket named blocksBucket:
  - If the bucket does not exist:
    - Create a new Genesis block.
    - Create the bucket named blocksBucket.
    - Store the Genesis block in the bucket with its hash as the key.
    - Store the Genesis block's hash in the bucket under the key "l".
  - If the bucket exists:
    - Retrieve the last hash stored under the key "l" and assign it to tip.

4. Create a New Blockchain Instance and return it:

```go
bc := &Blockchain{tip, db}
return bc
```

This line creates a new Blockchain instance with the tip pointing to the most recent block and the database connection and returns the newly created `Blockchain` instance.

Next thing we need to update is the `AddBlock` method. Now we are not storing blocks in an array, but in the database. Here is how it looks:

```go
func (bc *Blockchain) AddBlock(data string) {
	// Create var to save the hash of the last block
	var lastHash []byte

	// Get the last hash
	err := bc.db.View(func(tx *bbolt.Tx) error {
		// Get the bucket where the blockchain is
		b := tx.Bucket([]byte(blocksBucket))
		// Get the lastHash
		lastHash = b.Get([]byte("l"))
		return nil
	})
	if err != nil {
		fmt.Print("Error while getting lastHash")
	}

	// Create a newBlock
	newBlock := NewBlock(data, lastHash)

	// Add newBlock + update lastHash to bucket
	err = bc.db.Update(func(tx *bbolt.Tx) error {
		// Get the bucket that contains the blocks
		b := tx.Bucket([]byte(blocksBucket))
		// Add the new block to the bucket
		err = b.Put(newBlock.Hash, newBlock.SerialiseBlock())
		if err != nil {
			fmt.Print("Error while adding the newBlock to database")
		}
		// Update the last hash of the blockchain
		err = b.Put([]byte("l"), newBlock.Hash)
		if err != nil {
			fmt.Print("Error while updating the last hash in the database")
		}
		// Update the tip of the blockchain struct
		bc.tip = newBlock.Hash

		return nil
	})

}
```

This is also very simple:

1. Get the last hash from the database.
2. Create a new block with the last hash.
3. Add the new block to the database.
4. Update the last hash (the tip) in the database.
5. Update the tip in the `Blockchain` struct.

# Printing the Blockchain

After this updates, our code has a small flaw. We lost the ability to print the blockchain because we are not storing the blocks in an array anymore.

We can create a _Iterator_ that iterates over the blocks from the database. This approach will be very efficient, because we don't need to load all the blocks into memory to print them. Then, our blockchain iterator will look like this:

```go
type BlockchainIterator struct {
	currentHash []byte
	db          *bbolt.DB
}
```

Each time we want to iterate through the blocks in the blockchain, we will create a new `BlockchainIterator` instance. This instance will contain the hash of the block we are currently in the iteration and the database connection.

```go
func (bc *Blockchain) NewBlockchainIterator() *BlockchainIterator {
	bci := &BlockchainIterator{bc.tip, bc.db}

	return bci
}
```

> The **tip** is the identifier of a blockchain.

Our iterator will have only one job: to return the next block in the blockchain. Here is how it looks:

```go
func (i *BlockchainIterator) Next() *Block {
  // Create a block var to save the next block
  var block *Block
  // Get the current block that the Iterator is pointing to
  err := i.db.View( func(tx *bbolt.Tx) error {
    // Open bucket
    b := tx.Bucket([]byte(blocksBucket))
    // Get the block data (in bytes) that iterator is pointing to
    encodedBlock := b.Get(i.currentHash)
    // Deserialise the block
    block = DeserialiseBlock(encodedBlock)

    return nil
  })
  if err != nil {
    fmt.Print("Error while taking iterator block from DB")
  }

  // Update the iterator to get the next block
  i.currentHash = block.PrevHash

  return block
}
```

# CLI

Our implementation didn't have any way to interact with the program, so we need to improve this. We will create a simple command-line interface (CLI) to interact with our blockchain. We will create a few commands:

- `addblock` to add a new block to the blockchain
- `printchain` to print the entire blockchain

Our commands will be processes by the `CLI` struct:

```go
type CLI struct {
    bc *Blockchain
}
```

This will be an "entrypoint" to our `Run()` function:

```go
func (cli *CLI) Run() {
	// Check if the number of arguments is correct
	cli.validateArgs()

	// Set the commands available with the flag package
	addBlockCmd := flag.NewFlagSet("addblock", flag.ExitOnError)
	printChainCmd := flag.NewFlagSet("printchain", flag.ExitOnError)
	// Add a -data flag to the addBlock cmd that receives string inputs
	// name of flag + default value + description
	addBlockData := addBlockCmd.String("data", "", "Block data")

	// Pass(or Parse) the arguments to the different commands
	switch os.Args[1] {
	case "addblock":
		err := addBlockCmd.Parse(os.Args[2:])
		if err != nil {
			fmt.Println("Error parsing addblock args")
			os.Exit(1)
		}
	case "printchain":
		err := printChainCmd.Parse(os.Args[2:])
		if err != nil {
			fmt.Println("Error parsing printchain args")
			os.Exit(1)
		}

	// Wrong flag
	default:
		cli.printUsage()
		os.Exit(1)
	}

	// Run addBlock if it was populated
	if addBlockCmd.Parsed() {
		// Check that the data is not empty
		if *addBlockData == "" {
			cli.printUsage()
			os.Exit(1)
		}
		cli.addBlock(*addBlockData)
	}

	// Run printChain if it was populated
	if printChainCmd.Parsed() {
		cli.printChain()
	}

}
```

Couple things to notice from the code:

- We are using the `flag` package to parse the command-line arguments.

```go
addBlockCmd := flag.NewFlagSet("addblock", flag.ExitOnError)
printChainCmd := flag.NewFlagSet("printchain", flag.ExitOnError)
addBlockData := addBlockCmd.String("data", "", "Block data")
```

- We created two "helper" functions to guide the user on how to use the CLI:

```go
// Helper method that prints the correct usage of the program
func (cli *CLI) printUsage() {
	fmt.Println("How to use the program: ")
	fmt.Println("  addblock -data BLOCK_DATA - add a block to the blockchain")
	fmt.Println("  printchain - print all the blocks of the blockchain")
}

// Helper method that validates the number of arguments in the program
func (cli *CLI) validateArgs() {
	// If there are less than two arguments ->
	if len(os.Args) < 2 {
		// Print the correct commands that user should use
		cli.printUsage()
		// Close the program
		os.Exit(1)
	}
}
```

- And we parse the subcommands `addBlock` and `printChain` and relate them to their corresponding methods:

```go
// Add block cli method
func (cli *CLI) addBlock(data string) {
	cli.bc.AddBlock(data)
	fmt.Println("New block added succesfully!")
}

// Print blockchain cli method
func (cli *CLI) printChain() {
	// Create a new iterator
	bci := cli.bc.NewBlockchainIterator()

	// Run through every block
	for {
		block := bci.Next()

		fmt.Printf("Prev. Hash: %x\n", block.PrevHash)
		fmt.Printf("Hash: %x\n", block.Hash)
		fmt.Printf("Data: %s\n", block.Data)
		// Check the POW of this block
		pow := NewProofOfWork(block)
		fmt.Printf("Proof of Work: %s\n", strconv.FormatBool(pow.Validate()))
		fmt.Println()

		// Break the loop when the genesis block is reached
		if len(block.PrevHash) == 0 {
			fmt.Println("End of the blockchain!")
			break
		}
	}
}
```

And as our last step, we modify the `main` function to use our new CLI:

```go
func main() {
	// Create a blockchain
	myBlockchain := NewBlockchain()
  // Defer the closing of the blockchain
  defer myBlockchain.db.Close()

  // Create the cli
  cli := CLI{myBlockchain}
  cli.Run()
}
```

And that's it! We have a fully functional blockchain with a database and a CLI to interact with it.

This is an example of how the program output should look:

```bash
$ blockchain_go printchain
No existing blockchain found. Creating a new one...
Mining the block containing "Genesis Block"
0000012fbac34e67e81d2d7b9fc8f9a5b2f1b1e1f3b63c2937c05c7c5baf12cd

Prev. hash:
Data: Genesis Block
Hash: 0000012fbac34e67e81d2d7b9fc8f9a5b2f1b1e1f3b63c2937c05c7c5baf12cd
PoW: true

$ blockchain_go addblock -data "Transfer 5 ETH to Alice"
Mining the block containing "Transfer 5 ETH to Alice"
000000c8b8e3d2a5a3f4b0cb1fd1c1d0a6d5e2c4b1f0a8e7b4c6b3e5d1f8e9a7

Success!

$ blockchain_go addblock -data "Pay 2.718 BTC for services"
Mining the block containing "Pay 2.718 BTC for services"
000000bb3e8a2f1d3c4b2a1f6b8d9e4c2d7a3b4f2c1d3e5a7b6d2f8c9e1a5f4c

Success!

$ blockchain_go printchain
Prev. hash: 000000c8b8e3d2a5a3f4b0cb1fd1c1d0a6d5e2c4b1f0a8e7b4c6b3e5d1f8e9a7
Data: Pay 2.718 BTC for services
Hash: 000000bb3e8a2f1d3c4b2a1f6b8d9e4c2d7a3b4f2c1d3e5a7b6d2f8c9e1a5f4c
PoW: true

Prev. hash: 0000012fbac34e67e81d2d7b9fc8f9a5b2f1b1e1f3b63c2937c05c7c5baf12cd
Data: Transfer 5 ETH to Alice
Hash: 000000c8b8e3d2a5a3f4b0cb1fd1c1d0a6d5e2c4b1f0a8e7b4c6b3e5d1f8e9a7
PoW: true

Prev. hash:
Data: Genesis Block
Hash: 0000012fbac34e67e81d2d7b9fc8f9a5b2f1b1e1f3b63c2937c05c7c5baf12cd
PoW: true
```

# Conclusion

In this tutorial, we learned how to persist our blockchain data in a database using BoltDB. We also created a simple command-line interface to interact with our blockchain. We now have a fully functional blockchain with database persistence and a CLI. In the next tutorial, we will implement transactions and a wallet system to interact with our blockchain.

# External links

- [Complete code](https://github.com/EricDanielsH/go-blockchain/tree/part-3)

[^1]: [BoltDB](https://github.com/boltdb/bolt)

[^2]: [bbolt](https://pkg.go.dev/go.etcd.io/bbolt)

[^3]: [Bitcoin Core Data Storage](<https://en.bitcoin.it/wiki/Bitcoin_Core_0.11_(ch_2):_Data_Storage>)
