const fs = require("fs");

const Block = require("./Block");

class Chain {
    
    constructor() {
        this.chain = this.loadChain();
        this.difficulty = 4;
    }

    loadChain() {
        try {
            return JSON.parse(fs.readFileSync("./chain.json"));
        } catch (err) {
            console.log(err);
            return [new Block(Date.now().toString())];
        }
    }

    dumpChain() {
        if (this.isValid()) {
            const JSONChain = JSON.stringify(this.chain);

            fs.writeFileSync("./chain.json",JSONChain);
        }
        else{
            this.loadChain();
        }
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(block) {
        block.id = this.getLastBlock().id+1;
        block.prevHash = this.getLastBlock().hash;
        block.hash = block.getHash();
        block.mine(this.difficulty);
        this.chain.push(Object.freeze(block));

        this.dumpChain();
    }

    isValid(blockchain = this) {
        for (let i = 1; i < blockchain.chain.length; i++) {
            const currentBlock = blockchain.chain[i];
            const prevBlock = blockchain.chain[i-1];

            if (currentBlock.hash !== currentBlock.hash || prevBlock.hash !== currentBlock.prevHash) {
                return false;
            }
        }

        return true;
    }

}

module.exports=Chain;