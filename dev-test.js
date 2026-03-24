// call: npm run dev-test

const Block = require("./block");

/*  Test der Block-Funktionalität  */

const block = new Block("aktuelle zeit","hash1","hash2","meine Daten");
console.log(block.toString());
console.log(Block.genesis().toString());


const testBlock = Block.mineBlock(Block.genesis(),"testDaten")
console.log(testBlock.toString());
