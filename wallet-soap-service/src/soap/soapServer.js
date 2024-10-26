import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import soap from 'soap'

import confirmarPago from '../controllers/confirmarPago.js'
import consultarSaldo from '../controllers/consultarSaldo.js'
import realizarPago from '../controllers/realizarPago.js'
import recargarBilletera from '../controllers/recargarBilletera.js'
import registrarCliente from '../controllers/registrarCliente.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const wsdlPath = path.join(__dirname, './walletService.wsdl')

const soapServer = {
    initialize: (app) => {
        const service = {
            WalletService: {
                WalletPort: {
                    ConfirmarPago: async function (args) {
                        try {
                            const result = await confirmarPago({
                                idSesion: args.idSesion,
                                token: args.token
                            })
                            return { return: JSON.stringify(result) }
                        } catch (error) {
                            console.error('Error in ConfirmarPago: ', error)
                            return {
                                return: JSON.stringify({
                                    code: '99',
                                    data: {},
                                    message: 'Error interno del servidor',
                                    success: false
                                })
                            }
                        }
                    },

                    ConsultarSaldo: async function (args) {
                        try {
                            const result = await consultarSaldo({
                                celular: args.celular,
                                documento: args.documento
                            })
                            return { return: JSON.stringify(result) }
                        } catch (error) {
                            console.error('Error in ConsultarSaldo: ', error)
                            return {
                                return: JSON.stringify({
                                    code: '99',
                                    data: {},
                                    message: 'Error interno del servidor',
                                    success: false
                                })
                            }
                        }
                    },

                    Pagar: async function (args) {
                        try {
                            const result = await realizarPago({
                                celular: args.celular,
                                documento: args.documento,
                                monto: args.monto,
                                referencia: args.referencia
                            })
                            return { return: JSON.stringify(result) }
                        } catch (error) {
                            console.error('Error in RealizarPago: ', error)
                            return {
                                return: JSON.stringify({
                                    code: '99',
                                    data: {},
                                    message: 'Error interno del servidor',
                                    success: false
                                })
                            }
                        }
                    },

                    RecargarBilletera: async function (args) {
                        try {
                            const result = await recargarBilletera({
                                celular: args.celular,
                                documento: args.documento,
                                valor: args.valor
                            })
                            return { return: JSON.stringify(result) }
                        } catch (error) {
                            console.error('Error in RecargarBilletera: ', error)
                            return {
                                return: JSON.stringify({
                                    code: '99',
                                    data: {},
                                    message: 'Error interno del servidor',
                                    success: false
                                })
                            }
                        }
                    },

                    RegistrarCliente: async function (args) {
                        try {
                            const result = await registrarCliente({
                                celular: args.celular,
                                documento: args.documento,
                                email: args.email,
                                nombres: args.nombres
                            })
                            return { return: JSON.stringify(result) }
                        } catch (error) {
                            console.error('Error in RegistrarCliente: ', error)
                            return {
                                return: JSON.stringify({
                                    code: '99',
                                    data: {},
                                    message: 'Error interno del servidor',
                                    success: false
                                })
                            }
                        }
                    }
                }
            }
        }

        if (!fs.existsSync(wsdlPath)) {
            throw new Error(`WSDL file not found at ${wsdlPath}`)
        }

        const xml = fs.readFileSync(wsdlPath, 'utf8')

        try {
            soap.listen(app, '/soap/wallet', service, xml, function () {
                console.log('Servicio SOAP inicializado en /soap/wallet')
            })
        } catch (error) {
            console.error('Error al inicializar el servicio SOAP:', error)
            throw error
        }
    }
}

export default soapServer
