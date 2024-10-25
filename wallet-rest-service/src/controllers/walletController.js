import walletService from '../services/walletService.js'

class WalletController {
    registrarCliente = async (req, res) => {
        try {
            const { documento, nombres, email, celular } = req.body
            const response = await walletService.registrarCliente(documento, nombres, email, celular)
            res.json(response)
        } catch (error) {
            res.status(500).json({
                cod_error: '99',
                data: null,
                message_error: 'Error al registrar el cliente.',
                success: false
            })
        }
    }
}

const walletController = new WalletController()
export default walletController
