const goudou = require("./index");

goudou.addBlock(new Block(Date.now().toString(), { from: "Ariel", to: "Jovenel", amount: 100 }));

console.log(goudou.chain);