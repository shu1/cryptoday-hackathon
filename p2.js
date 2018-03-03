const ElectrumCli = require('electrum-client');
const main = async () => {
    const ecl = new ElectrumCli(50001, '18.221.223.44', 'tcp') // tcp or tls
    await ecl.connect() // connect(promise)
    ecl.subscribe.on('blockchain.headers.subscribe', (v) => console.log(v)) // subscribe message(EventEmitter)
    try{
        const balance = await ecl.blockchainAddress_getBalance("n2TXo1LNnbyxe7yyLj9wkVJxEW5gVvUw5A")
        console.log(balance)
    }catch(e){
        console.log(e)
    }
    await ecl.close() // disconnect(promise)
}
main()
