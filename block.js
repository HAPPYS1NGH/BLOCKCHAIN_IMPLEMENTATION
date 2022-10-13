const { GENESIS_DATA, MINE_RATE } = require("./config");
const cryptoHash = require("./crypto-hash");
const hexToBinary = require("hex-to-binary");

class Block {
  constructor({ timestamp, prevhash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.prevhash = prevhash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }
  static genesis() {
    return new this(GENESIS_DATA);
  }

  static mineBlock({ prevBlock, data }) {
    let timestamp, hash;
    const prevhash = prevBlock.hash;
    let { difficulty } = prevBlock;
    let nonce = 0;
    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty({
        originalBlock: prevBlock,
        timestamp,
      });
      hash = cryptoHash(timestamp, prevhash, data, nonce, difficulty);
    } while (
      hexToBinary(hash).substring(0, difficulty) !== "0".repeat(difficulty)
    );
    return new this({
      timestamp,
      prevhash,
      hash,
      data,
      nonce,
      difficulty,
    });
  }
  static adjustDifficulty({ originalBlock, timestamp }) {
    const { difficulty } = originalBlock;
    if (difficulty < 1) {
      return 1;
    }
    const difference = timestamp - originalBlock.timestamp;
    // console.log(difference);
    if (difference > MINE_RATE) return difficulty - 1;
    return difficulty + 1;
  }
}

// const Block1 = new Block({
//   timestamp: Date.now(),
//   prevhash: "0x000",
//   hash: "0x123",
//   data: "Genesis Block",
//   nonce: 0,
//   difficulty: 2,
// });

// const genesisblock = Block.genesis();
// console.log(genesisblock);
// const minedBlock = Block.mineBlock({ prevBlock: Block1, data: "Block1" });
// console.log(minedBlock);

module.exports = Block;
