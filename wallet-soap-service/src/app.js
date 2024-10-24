const express = require('express');
// const { registerClient, rechargeWallet, checkBalance } = require('./controllers/soapController');
import soapServer from '@/soap/soapServer'

const app = express()
const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`SOAP server running on port ${port}`)
    soapServer.initialize(app) // Inicializa el servidor SOAP
});
