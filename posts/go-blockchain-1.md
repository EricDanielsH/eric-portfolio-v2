---
title: "Basics of a Blockchain | Blockchain in Go: Part 1"
summary: "Learn the basics of blockchain and how to build a simple blockchain in Go."
date: "30 May 2024"
author: "Eric Daniels"
tags: ["go", "blockchain", "tutorial", "crypto"]
draft: false
---

Last updated: May 30, 2024

# Introduction

Blockchain is one of the most revolutionary technologies of the 21st century, which is still maturing and whose potential is not fully realized yet. In its essence, blockchain is just a distributed database of records. But what makes it unique is that it’s not a private database, but a public one, i.e., everyone who uses it has a full or partial copy of it. A new record can be added only with the consent of other keepers of the database. Additionally, blockchain is the technology that made cryptocurrencies and smart contracts possible.

In this series of articles, we’ll build a simplified cryptocurrency that’s based on a simple blockchain implementation. We'll explore the fundamental concepts and technical details necessary to create a basic blockchain and cryptocurrency using Go.

This series is inspired by [Jeiwan's blog posts](https://jeiwan.net/posts/building-blockchain-in-go-part-1/), which provides a detailed guide on building a blockchain in Go. You can find the complete code for our project on my [GitHub repository.](https://github.com/EricDanielsH/go-blockchain)

Stay tuned as we delve into the exciting world of blockchain development with Go!

# Block

In this section, we will delve into the creation of a Block for our blockchain. The Block struct and its associated methods form the foundation of our blockchain implementation. Let’s break down the code and explain each part in detail.

## Creating the Block Struct

```go
type Block struct {
    Timestamp int64
    PrevHash  []byte
    Hash      []byte
    Data      []byte
}

```

The Block struct is the core structure that represents each block in our blockchain. It consists of the following fields:

- **Timestamp:** This field stores the time when the block was created. It is represented as an int64, which captures the Unix timestamp.
- **PrevHash:** This byte slice holds the hash of the previous block in the blockchain. It links the current block to the previous one, ensuring the integrity of the chain.
- **Hash:** This byte slice is the unique identifier of the block, generated from the block’s contents. It is calculated using the SHA-256 hashing algorithm.
- **Data:** This byte slice contains the actual data or transactions that the block is recording.

## Setting the Hash of a new Block

Next, we need to implement a method that calculates the hash of a block. The hash is a unique identifier that is generated based on the block’s contents. We will use the SHA-256 hashing algorithm to create the hash.

```go
func (b *Block) SetHash() {
    timestamp := []byte(strconv.FormatInt(b.Timestamp, 10))
    header := bytes.Join([][]byte{timestamp, b.PrevHash, b.Data}, []byte{})
    hash := sha256.Sum256(header)
    b.Hash = hash[:]
}
```

Here's how the code works:

1. **Convert Timestamp to Bytes:** The Unix timestamp, initially an int64, is converted to a byte slice. This involves converting the int64 to a string, and then to a byte slice.
2. **Create the Header:** The timestamp, PrevHash, and Data fields are joined together to form a single byte slice called the header. This header represents the content that will be hashed.
3. **Generate the Hash:** The SHA-256 hashing algorithm is applied to the header to generate a hash. This produces an array of 32 bytes.
4. **Set the Hash:** The generated hash is then converted to a byte slice and assigned to the Hash field of the block.

## Creating a New Block

Now that we have defined the Block struct and implemented the SetHash method, we can create a new block using the following function:

```go
func NewBlock(data string, prevHash []byte) *Block {
    block := &Block{time.Now().Unix(), prevHash, []byte{}, []byte(data)}
    block.SetHash()
    return block
}
```

The NewBlock function is a constructor that creates a new block. Here’s the step-by-step process:

1. **Instantiate the Block:** A new Block instance is created with the current Unix timestamp, the hash of the previous block, an empty byte slice for the hash (which will be set later), and the provided data converted to a byte slice.
2. **Compute the Hash:** The SetHash method is called to compute and set the hash for the new block.
3. **Return the Block:** Finally, the new block is returned as a pointer.

## Block Summary

By understanding these components, you can see how each block is created, linked to the previous block, and uniquely identified by its hash. This ensures the integrity and security of the blockchain. In the next part of this series, we’ll explore how to create a chain of blocks and further enhance our blockchain implementation.

# Blockchain

In this section, we will discuss how to create a Blockchain using Go. We'll break down the Blockchain struct and its methods to understand how blocks are added to the blockchain, how the genesis block is created, and how a new blockchain is initialized.

## The Blockchain Struct

```go
type Blockchain struct {
    blocks []*Block
}
```

The Blockchain struct represents the entire blockchain and consists of a single field:

- blocks: A slice of pointers to Block structs. This slice maintains the sequence of blocks in the blockchain.

## Adding a Block to the Blockchain

```go
func (bc *Blockchain) AddBlock(data string) {
    prevBlock := bc.blocks[len(bc.blocks)-1]
    newBlock := NewBlock(data, prevBlock.Hash)
    bc.blocks = append(bc.blocks, newBlock)
}
```

The AddBlock method allows us to add a new block to the blockchain. Here’s how it works:

1. **Get the Previous Block:** The last block in the blocks slice is retrieved. This block is the most recent one added to the blockchain.
2. **Create a New Block:** A new block is created using the NewBlock function, with the provided data and the hash of the previous block.
3. **Append the New Block:** The new block is appended to the blocks slice, extending the blockchain with the new block.

## Creating the Genesis Block

```go
func NewGenesisBlock() *Block {
    return NewBlock("Genesis Block", []byte{})
}
```

The NewGenesisBlock function creates the initial block of the blockchain, known as the genesis block. This block has no previous hash and is typically hardcoded into the blockchain to serve as the starting point.
Here's how it works:

1. **Block Creation:** A new block is created with the data “Genesis Block” and an empty byte slice for the previous hash.

## Initializing a New Blockchain

```go
func NewBlockchain() *Blockchain {
    return &Blockchain{[]*Block{NewGenesisBlock()}}
}
```

The NewBlockchain function initializes a new blockchain with the genesis block. Here’s the process:

1. **Genesis Block:** The genesis block is created using the NewGenesisBlock function.
2. **Blockchain Initialization:** A new Blockchain instance is created with the genesis block as the first block in the blocks slice.

## Blockchain Summary

In this section, we explored how to create a blockchain in Go by defining the Blockchain struct, adding blocks to the blockchain, creating the genesis block, and initializing a new blockchain. By understanding these components, you can start building a simple blockchain system that maintains a secure and tamper-proof ledger of transactions.

# Conclusion

We have built a basic blockchain prototype: an array of blocks where each block links to the previous one. While our implementation demonstrates the fundamental structure, actual blockchains are far more complex. In our simple model, adding new blocks is straightforward and quick. However, in real-world blockchains, adding new blocks requires significant computational effort, a process known as Proof-of-Work. Additionally, blockchains function as distributed databases without a single decision maker. Therefore, a new block must be validated and agreed upon by other network participants, a process known as consensus. Moreover, our prototype does not yet include transactions, which are a crucial part of real blockchains.
