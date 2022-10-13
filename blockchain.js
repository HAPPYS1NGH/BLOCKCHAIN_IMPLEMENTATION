const Block = require("./block");
const cryptoHash = require("./crypto-hash");

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }
  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      prevBlock: this.chain[this.chain.length - 1],
      data,
    });
    this.chain.push(newBlock);
  }

  replaceChain(chain) {
    if (chain <= this.chain.length) {
      console.error("Chain given is not longer");
      return;
    }
    if (!Blockchain.isValidChain(chain)) {
      console.error("Chain is not valid");
      return;
    }
    this.chain = chain;
  }

  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }
    for (let i = 1; i < chain.length; i++) {
      const { timestamp, prevhash, hash, data, nonce, difficulty } = chain[i];
      const lasthash = chain[i - 1].hash;

      if (lasthash !== prevhash) {
        return false;
      }
      const validatedHash = cryptoHash(
        timestamp,
        prevhash,
        data,
        nonce,
        difficulty
      );
      if (Math.abs(chain[i - 1].difficulty) - difficulty > 1) return false;
      if (hash !== validatedHash) {
        return false;
      }
    }
    return true;
  }
}

// const blockchain = new Blockchain();
// blockchain.addBlock({ data: "Block1" });
// blockchain.addBlock({ data: "Block2" });

// console.log(blockchain);
// console.log(Blockchain.isValidChain(blockchain.chain));
module.exports = Blockchain;
