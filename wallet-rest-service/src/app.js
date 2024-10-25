import express from 'express'
import morgan from 'morgan'

import walletController from './controllers/walletController.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(morgan('dev'))
app.use(express.json())

// Rutas
app.post('/api/registrarCliente', walletController.registrarCliente.bind(walletController))

app.listen(PORT, () => {
    console.log(`Servidor REST ejecutandose en http://localhost:${PORT}`)
})
