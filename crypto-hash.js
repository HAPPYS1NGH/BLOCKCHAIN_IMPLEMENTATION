const crypto = require("crypto");

const cryptoHash = (...inputs) => {
  const hash = crypto.createHash("sha256");
  hash.update(inputs.sort().join(""));
  return hash.digest("hex");
};
// const a = cryptoHash("hello", "world");
// console.log(a);
module.exports = cryptoHash;
