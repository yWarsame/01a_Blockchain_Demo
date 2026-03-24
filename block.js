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
        // const hash      = "Hash to do: data";  // 1. iteration: Fake
        //const hash      = Block.hash(timestamp,lastHash,blockData); // 2. iteration: SHA256
        const hash      = Block.leadingZeroHash(timestamp,lastHash,blockData); // 3. Iteration

        return new this(timestamp, lastHash, hash, blockData); // call constructor

    }

    static leadingZeroHash(timestamp,lastHash,blockData){
        
        let toBeHashed = timestamp + lastHash + blockData;

        const leadingZeros = 4;
        const pattern = "^0{"+leadingZeros+"}\w*";
        const regex = new RegExp(pattern);

        const maxNonce = 100000;
        let tmpNonce = 0;
        let tmpHash;

        let startTime = Date.now();

        do {
            tmpHash = this.hash(toBeHashed + tmpNonce);
            tmpNonce++;
        } while (!regex.test(tmpHash) && tmpNonce < maxNonce);
        
        let endTime = Date.now();
        
        let message =    
        `Anzahl der Durchläufe: ${tmpNonce}
        Hashwert:  ${tmpHash}
        Berechnungen pro ms: ${tmpNonce/(endTime-startTime)}`
        // console.log(message);

        return tmpHash;
    }


    static hash(timestamp,lastHash,data){
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }







}

module.exports = Block; // Export als Modul