const internal = require("stream");
const { generateSHA256 } = require("./utils");

class Block {
    constructor(timestamp = "", data = []) {
        this.id = 0;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.getHash();
        this.prevHash = "";
        this.nonce = 0;
        this.difficulty = 1;
    }

    getHash() {
        return generateSHA256(this.id + this.prevHash + this.timestamp + this.nonce +  this.difficulty + JSON.stringify(this.data));
    }

    mine(prevBlock) {
        
        this.difficulty = Math.log10(prevBlock.difficulty + Math.trunc(prevBlock.difficulty / 2048 * Math.max(1 - (this.timestamp - prevBlock.timestamp) / 10, -99)) + Math.abs(Math.trunc(2**(Math.trunc((this.id / 100000))) - 2)));
        
        while (!this.hash.startsWith(Array(this.difficulty + 1).join("0"))) {
            this.nonce++;
            this.hash = this.getHash();

            console.log(this.hash);
        }
    }
}

module.exports=Block;