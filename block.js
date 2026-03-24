// Klasse

const SHA256 = require("crypto-js/sha256");

class Block{

    constructor(timestamp, lastHash, hash, data){
        this.timestamp = timestamp; // Zeitstempel
        this.lastHash = lastHash; // Hash d. Vorgängers
        this.hash = hash; //Eigener Hash
        this.data = data; // Eigene Blockdaten
    }

    toString(){ // für Debugging-Zwecke
        return `Block -
        Timestamp:  ${this.timestamp}
        Last Hash:  ${this.lastHash}
        Hash:       ${this.hash}
        Data:       ${this.data}`
    }

    static genesis(){ // 1. Block der chain
        // call constructor
        return new this("GenesisTime","000000","#abcdC1234","GenesisData"); 
    }

    static mineBlock(lastBlock, blockData){ // weitere Blocks in der Chain
        
        const timestamp = Date.now(); // Zeit im ms seit 01.01.1970 | UNIX
        const lastHash  = lastBlock.hash; // HASH-Wert des Vorgängers
        // const hash      = "Hash to do: data";  // Fake
        const hash      = Block.hash(timestamp,lastHash,blockData); // SHA256

        return new this(timestamp, lastHash, hash, blockData); // call constructor

    }

    static hash(timestamp,lastHash,data){
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }







}

module.exports = Block; // Export als Modul