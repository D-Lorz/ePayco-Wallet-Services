import express from 'express'
import soapServer from './soap/soapServer.js'
import morgan from 'morgan'

const app = express()
const port = process.env.PORT || 4000

// Use morgan for logging HTTP requests in development mode
app.use(morgan('dev'));

app.listen(port, () => {
    console.log(`SOAP server running on port ${port}`)
    soapServer.initialize(app) // Inicializa el servidor SOAP
})
