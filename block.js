// Klasse
class Block {

    constructor (timestamp,lastHash, hash, data){
        this.timestamp=timestamp; // zeitstempel
        this.lastHash=lastHash; // Hash des Vorhergehenden Blocks
        this.hash=hash; // Eigener Hash
        this.data=data; // Daten
    }
    // ausgabe funktion
    toString()
    { // für Debugging-Zwecke
        return `Block -
        Timestamp:  ${this.timestamp}
        Last Hash:  ${this.lastHash}
        Hash:       ${this.hash}
        Data:       ${this.data}`

    }

    static genesis()
    { // 1. Block der chain
        return new this("GenesisTime","000000","#abcdC1234","GenesisData"); // call constructor
    }












}
module.exports = Block; // Export als Modul