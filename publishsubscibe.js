const redis = require("redis");

const CHANNELS = { TEST: "TEST", BLOCKCHAIN: "BLOCKCHAIN" };

class PubSub {
  constructor({ blockchain }) {
    this.blockchain = blockchain;
    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();

    this.subscriber.subscribe(CHANNELS.TEST);
    this.subscriber.subscribe(CHANNELS.BLOCKCHAIN);

    this.subscriber.on("message", (channel, message) =>
      this.handleMessage(channel, message)
    );
  }
  handleMessage(channel, message) {
    console.log(`Message Recieved at Channel ${channel}  Message : ${message}`);
  }
  publish(channel, message) {
    this.publisher.publish(channel, message);
  }
}

// const checkPubSub = new PubSub();
// setTimeout(() => checkPubSub.publisher.publish(CHANNELS.TEST, "HELLO"), 1000);
