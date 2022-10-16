const goudou = require("./goudou");

goudou.addTransaction({ from: "Ariel", to: "Jovenel", amount: 100 });

console.log(goudou.chain);