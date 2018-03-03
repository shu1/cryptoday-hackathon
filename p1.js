var bip39   = require("bip39");
var bitcoin = require("bitcoinjs-lib");

//var mnemonic = bip39.generateMnemonic();
var mnemonic = "hotel depth goose snap fancy ripple cinnamon suffer already horror innocent cable";
console.log("Mnemonic: " + mnemonic);

var seed = bip39.mnemonicToSeed(mnemonic);
//console.log(seed);

var root = bitcoin.HDNode.fromSeedBuffer(seed, bitcoin.networks.testnet);
var btc  = root.derivePath("m/44'/1'/0'/0/0");
console.log("BTC: " + btc.getAddress() + " WIF: " + btc.keyPair.toWIF());

root = bitcoin.HDNode.fromSeedBuffer(seed, bitcoin.networks.litecoin);
var ltc  = root.derivePath("m/44'/2'/0'/0/0");
console.log("LTC: " + ltc.getAddress());

var viacoin = {
  bip32: {
    public: 0x0488b21e,
    private: 0x0488ade4
  },
  dustThreshold: 560,
  feePerKb: 100000,
  messagePrefix: '\x18Viacoin Signed Message:\n',
  pubKeyHash: 0x47,
  scriptHash: 0x21,
  wif: 0xc7
}

root = bitcoin.HDNode.fromSeedBuffer(seed, viacoin);
var via = root.derivePath("m/44'/14'/0'/0/0");
console.log("VIA: " + via.getAddress());
