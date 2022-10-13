const Blockchain = require("./blockchain");

const blockchain = new Blockchain();
blockchain.addBlock({ data: "New" });
let prevTimestamp, nextTimestamp, nextBlock, averageTime, timeDiff;
const times = [];

for (let i = 1; i < 1000; i++) {
  prevTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp;
  blockchain.addBlock({ data: `Block ${i}` });
  nextBlock = blockchain.chain[blockchain.chain.length - 1];
  nextTimestamp = nextBlock.timestamp;
  timeDiff = nextTimestamp - prevTimestamp;
  times.push(timeDiff);
  averageTime = times.reduce((total, num) => total + num) / times.length;
  console.log(
    `timeDiff ${timeDiff}  difficlty ${nextBlock.difficulty}  Average Time ${averageTime}`
  );
}
