import soap from 'soap'
import path from 'path'
import registrarCliente from '@/controllers/registrarCliente'
import recargarBilletera from '@/controllers/recargarBilletera'
import consultarSaldo from '@/controllers/consultarSaldo'
import pagar from '@/controllers/pagar'
import confirmarPago from '@/controllers/confirmarPago'

const wsdlPath = path.join(__dirname, 'walletService.wsdl') // Archivo WSDL

exports.initialize = (app) => {
    const service = {
        WalletService: {
            WalletServiceSoapPort: {
                registrarCliente,
                recargarBilletera,
                consultarSaldo,
                pagar,
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
};
