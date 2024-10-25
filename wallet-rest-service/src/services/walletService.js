import SoapClient from '../soapClient.js'

const soapClient = new SoapClient(process.env.SOAP_SERVICE_URL) // URL del servicio SOAP

class WalletService {
    async registrarCliente (documento, nombres, email, celular) {
        const payload = { celular, documento, email, nombres }
        return await soapClient.callSoapService('registrarCliente', payload)
    }
}

const walletService = new WalletService()
export default walletService
