var bip39   = require("bip39");
var bitcoin = require("bitcoinjs-lib");
var mnemonic = "hotel depth goose snap fancy ripple cinnamon suffer already horror innocent cable";
var seed = bip39.mnemonicToSeed(mnemonic);
var root = bitcoin.HDNode.fromSeedBuffer(seed, bitcoin.networks.testnet);
var btc  = root.derivePath("m/44'/1'/0'/0/0");

const ElectrumCli = require('electrum-client');
const main = async () => {
    const ecl = new ElectrumCli(50001, '18.221.223.44', 'tcp') // tcp or tls
    await ecl.connect() // connect(promise)
    ecl.subscribe.on('blockchain.headers.subscribe', (v) => console.log(v)) // subscribe message(EventEmitter)
    try{
        const unspent = await ecl.blockchainAddress_listunspent("n2TXo1LNnbyxe7yyLj9wkVJxEW5gVvUw5A");
        console.log(unspent);

		var txb = new bitcoin.TransactionBuilder(bitcoin.networks.testnet);
		txb.addInput(unspent[0].tx_hash, unspent[0].tx_pos);
		txb.addOutput("2N8hwP1WmJrFF5QWABn38y63uYLhnJYJYTF", unspent[0].value - 100000);
		txb.sign(0, btc.keyPair);

		const res = await ecl.blockchainTransaction_broadcast(txb.build().toHex());
        console.log(res);
    }catch(e){
        console.log(e);
    }
    await ecl.close(); // disconnect(promise)
}
main();
