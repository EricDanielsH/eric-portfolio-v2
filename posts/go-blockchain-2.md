---
title: "Proof of Work | Blockchain in Go: Part 2"
summary: "Learn about Proof-of-Work, a fundamental concept in blockchain, and implement it in a Go blockchain prototype."
date: "02 June 2024"
lastmod: "02 June 2024"
author: "Eric Daniels"
tags: ["go", "blockchain", "tutorial", "crypto"]
draft: false
---

## Introduction

In the previous article, we constructed a simple data structure that forms the foundation of a blockchain database. We enabled the addition of blocks, with each block being linked to the previous one in a chain-like manner. However, our initial implementation has a critical flaw: adding blocks to the chain is straightforward and inexpensive. One of the core principles of blockchain and Bitcoin is that adding new blocks should be a challenging task. Today, we are going to address this issue.

## Proof of Work

A fundamental concept of blockchain is that significant effort must be expended to add data to it. This strenuous effort is what makes the blockchain secure and consistent. Additionally, a reward is given for this effort (this is how miners earn coins).

This mechanism mirrors real life: one must work hard to earn a reward and sustain their livelihood. In the blockchain, certain participants (miners) perform the necessary work to sustain the network, add new blocks, and receive a reward for their efforts. Through their work, blocks are securely added to the blockchain, ensuring the stability of the entire blockchain database. Importantly, the miner who completes the work must also prove it.

This entire "work hard and prove it" mechanism is known as proof-of-work. It is demanding because it requires substantial computational power: even high-performance computers cannot complete it quickly. Moreover, the difficulty of this task increases periodically to maintain a rate of approximately six new blocks per hour. In Bitcoin, the objective of this work is to find a hash for a block that meets specific criteria. This hash serves as the proof. Therefore, discovering this proof is the actual task.

One final point to consider: Proof-of-Work algorithms must ensure that while performing the work is difficult, verifying the proof is straightforward. Since the proof is typically presented to another party, it should be easy and quick for them to verify.

# Hashcash

Bitcoin uses Hashcash, a Proof-of-Work algorithm originally developed to prevent email spam. The algorithm can be broken down into the following steps:

Start with Publicly Known Data: In the case of Bitcoin, this data is the block headers.
Add a Counter: The counter starts at 0 and is used to modify the data.
Hash the Data: Generate a hash from the combination of the data and the counter.
Check the Hash: Determine if the hash meets certain predefined requirements.
Validation: If the hash meets the requirements, the process is complete. If not, increment the counter and repeat steps 3 and 4.
This method is essentially a brute force algorithm: modify the counter, calculate a new hash, check it, and if it doesn't meet the requirements, increment the counter and try again. This repetitive process is what makes Proof-of-Work computationally expensive.

### Hash Requirements

The specific requirements that a hash must meet are crucial to the Proof-of-Work process. In the original Hashcash implementation, the requirement was that the first 20 bits of a hash must be zeros. In Bitcoin, these requirements are adjusted periodically. This adjustment ensures that despite increases in computational power and the number of miners, a block is still generated approximately every 10 minutes.

### Demonstrating Proof-of-Work

To illustrate how this algorithm works, consider how a hash needs to meet specific criteria. For example, in a simplified scenario, a valid hash might need to start with a certain number of leading zero bytes. This requirement ensures that the computational effort to find a valid hash remains significant, maintaining the integrity and security of the blockchain.

Through this process, Bitcoin ensures that adding new blocks to the blockchain remains a resource-intensive task, providing security and stability to the entire network.

## Implementation

First, we need to set the difficulty of the Proof-of-Work algorithm. This difficulty determines how many leading zeros the hash must have. The higher the difficulty, the more challenging it is to find a valid hash.

```go
const targetBits = 24
```

The number 24 is chosen arbitrarily; our objective is to have a target that occupies less than 256 bits in memory. We aim for a noticeable difference, but not an excessive one, because a larger difference increases the difficulty of finding an appropriate hash.

Next, we create a Proof-of-Work struct that contains the block and the target bits. This struct will be used to perform the Proof-of-Work algorithm.

```go
type ProofOfWork struct {
    block  *Block
    target *big.Int
}
```

The `ProofOfWork` struct contains the block for which we are calculating the Proof-of-Work and the target value. The target value is a big integer that represents the difficulty level of the Proof-of-Work algorithm. The target is used to compare the hash of the block and determine if it meets the required criteria.

Now, we need to create a function that initializes the Proof-of-Work struct. This function sets the target value based on the difficulty level.

```go
func NewProofOfWork(b *Block) *ProofOfWork {
    target := big.NewInt(1)
    target.Lsh(target, uint(256-targetBits))
    pow := &ProofOfWork{b, target}
    return pow
}
```

The `NewProofOfWork` function initializes a new Proof-of-Work struct with the provided block and target bits. The target value is calculated by shifting a big integer left by the difference between 256 and the target bits. This operation creates a target value with the required number of leading zeros.

Next, we need to create a function that combines the block data and the counter to generate a hash. This function is used to calculate the Proof-of-Work hash.

```go
func (pow *ProofOfWork) PrepareData(nonce int) []byte {
  // Join Timestamp, PrevHash, Data, TargetBits and Nonce
  data := bytes.Join([][]byte{
    IntToHex(pow.block.Timestamp),
    pow.block.PrevHash,
    pow.block.Data,
    IntToHex(int64(targetBits)),
    IntToHex(int64(nonce)),
    }, []byte{})

  return data
}
```

The `prepareData` function concatenates the block's previous block hash, data, timestamp, target bits, and nonce to create a byte slice. This byte slice is used to generate the hash for the Proof-of-Work algorithm.

Finally, we need to implement the Proof-of-Work algorithm itself. This algorithm generates a hash from the block data and the counter, compares it to the target value, and returns the hash and the counter.

```go
func (pow *ProofOfWork) Run() (int, []byte) {
  // Create loop that adds +1 to the nonce and checks
  var bigHash big.Int
  var hash [32]byte
  nonce := 0

  fmt.Printf("Currently printing block with data '%s'\n", pow.block.Data)
  for nonce < maxNonce {
    // Create data
    data:= pow.PrepareData(nonce)
    // Generate hash with the d
    hash = sha256.Sum256(data)
    // Insert hash into a bigInt
    bigHash.SetBytes(hash[:])

    if (bigHash.Cmp(pow.target) == -1) {
      break
    } else {
      nonce++
    }
  }
  return nonce, hash[:]
}
```

The `Run` function is the core of the Proof-of-Work algorithm. It generates a hash from the block data and the counter, compares it to the target value, and increments the counter until a hash is found that meets the required criteria. The function returns the counter value and the hash that meets the criteria.

Now, we can remove the `SetHash` method from the `Block` struct and replace it with the Proof-of-Work algorithm. This change ensures that the hash is generated using the Proof-of-Work algorithm.

```go
func NewBlock(data string, prevHash []byte) *Block {
	// Create a pointer to a new Block with the data
	block := &Block{time.Now().Unix(), prevHash, []byte{}, []byte(data), 0}
	// Compute the hash and nonce with POW
  pow := NewProofOfWork(block)
  nonce, hash := pow.Run()

  block.Nonce = nonce
  block.Hash = hash

	// Return block
	return block
}
```

And update the `Block` struct to include the `Nonce` field.

```go
type Block struct {
	Timestamp int64
	PrevHash  []byte
	Hash      []byte
	Data      []byte
	Nonce     int
}
```

We can still increase the security by creting a method to validate the Proof-of-Work hash.

```go
func (pow *ProofOfWork) Validate() bool {
  var bigHash big.Int

  data := pow.PrepareData(pow.block.Nonce)
  hash := sha256.Sum256(data)
  bigHash.SetBytes(hash[:])
  isValid := bigHash.Cmp(pow.target) == -1


  return isValid
}
```

This method validates the Proof-of-Work hash by comparing the generated hash to the target value. If the hash meets the required criteria, the method returns true; otherwise, it returns false.

We can prove that the Proof-of-Work algorithm is functioning correctly by adding a simple test in our main function.

```go
func main() {
	...

	for _, block := range bc.blocks {
		...
		pow := NewProofOfWork(block)
		fmt.Printf("PoW: %s\n", strconv.FormatBool(pow.Validate()))
		fmt.Println()
	}
}
```

## Conclusion

Our blockchain is now more closely aligned with its real-world architecture: adding blocks requires significant effort, making mining feasible. However, it still lacks several essential features: the blockchain database is not persistent, and it lacks wallets, addresses, transactions, and a consensus mechanism. We will implement these features in future articles.

---

Links:

1. [Go Blockchain Part 1](/blog/go-blockchain-1)
2. [Inspiration for this article](https://jeiwan.cc/posts/building-blockchain-in-go-part-2/)
3. Full code for this project on [GitHub](https://github.com/EricDanielsH/go-blockchain)
