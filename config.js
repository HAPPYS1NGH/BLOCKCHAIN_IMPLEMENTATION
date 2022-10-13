const cryptoHash = require("./crypto-hash");
const MINE_RATE = 1000;
const INITIAL_DIFFICLTY = 10;
const TIMESTAMP = Date.now();
const PREVHASH =
  "0X00000000000000000000000000000000000000000000000000000000000000";
const HASH = cryptoHash(TIMESTAMP, PREVHASH, 0, INITIAL_DIFFICLTY);
const GENESIS_DATA = {
  timestamp: TIMESTAMP,
  prevhash: PREVHASH,
  hash: HASH,
  data: [],
  nonce: 0,
  difficulty: INITIAL_DIFFICLTY,
};
module.exports = { GENESIS_DATA, MINE_RATE };
