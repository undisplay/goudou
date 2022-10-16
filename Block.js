const { generateSHA256 } = require("./utils");

class Block {
    constructor(timestamp = "", data = []) {
        this.id = 0;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.getHash();
        this.prevHash = "";
        this.nonce = 0;
    }

    getHash() {
        return generateSHA256(this.prevHash + this.timestamp + this.nonce + JSON.stringify(this.data));
    }

    mine(difficulty) {
        while (!this.hash.startsWith(Array(difficulty + 1).join("0"))) {
            this.nonce++;
            this.hash = this.getHash();

            console.log(this.hash);
        }
    }
}

module.exports=Block;