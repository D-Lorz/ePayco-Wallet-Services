import soap from 'soap'
import path from 'path'
import registrarCliente from '../controllers/registrarCliente.js'
import consultarSaldo from '../controllers/consultarSaldo.js'
import recargarBilletera from '../controllers/recargarBilletera.js'
import confirmarPago from '../controllers/confirmarPago.js'
import realizarPago from '../controllers/realizarPago.js'

import { fileURLToPath } from 'url';

// Para obtener el __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wsdlPath = path.join(__dirname, './walletService.wsdl') // Archivo WSDL

const soapServer = {
    initialize: (app) => {
        const service = {
            WalletService: {
                WalletServiceSoapPort: {
                    registrarCliente,
                    consultarSaldo,
                    recargarBilletera,
                    pagar: realizarPago,
                    confirmarPago
                }
            }
        }
    
        // Cargar el archivo WSDL y crear el servidor SOAP con manejo de errores
        try {
            soap.listen(app, '/wallet', service, wsdlPath, () => {
                console.log('Servicio SOAP inicializado en /wallet');
            });
        } catch (error) {
            console.error('Error al inicializar el servicio SOAP:', error);
        }
    }
}

export default soapServer
