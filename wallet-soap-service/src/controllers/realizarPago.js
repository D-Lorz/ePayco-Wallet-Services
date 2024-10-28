import prisma from '../prismaClient.js'
import sendEmail from '../utils/mailService.js'
import formatResponse from '../utils/responseHelper.js'
import { generateToken, generateSessionId } from '../utils/tokenGenerator.js'

const realizarPago = async (args) => {
    const { documento, celular, monto, referencia } = args

    if (!documento || !celular || !monto || monto <= 0 || !referencia) {
        return formatResponse('01', {}, 'Parámetros inválidos', false)
    }

    try {
        const usuario = await prisma.usuario.findUnique({ where: { documento } })

        if (!usuario || usuario.celular !== celular) {
            return formatResponse('02', {}, 'Usuario no encontrado o número de celular no coincide', false)
        }

        const billetera = await prisma.billetera.findUnique({ where: { documento } })

        if (billetera.saldo < monto) {
            return formatResponse('03', {}, 'Saldo insuficiente', false)
        }

        const token = generateToken()
        const idSesion = generateSessionId()

        // Enviar el token por correo
        try {
            console.log("Enviando el token por correo electrónico...")
            await sendEmail(usuario.email, token)
        } catch (error) {
            console.error('Error al enviar el token por correo electrónico:', error)
            return formatResponse('04', {}, 'Error al enviar el token por correo electrónico', false)
        }

        console.log("Token: ", token)
        console.log("ID de sesión: ", idSesion)

        // Crear la transacción en estado "Pendiente"
        const transaccion = await prisma.transaccion.create({
            data: {
                creadoEn: new Date(),
                documento,
                estado: 'Pendiente',
                monto
            }
        })

        // Guardar la sesión de transacción en la base de datos
        await prisma.sesionTransaccion.create({
            data: {
                creadoEn: new Date(),
                documento,
                expiraEn: new Date(new Date().getTime() + 1000 * 60 * 60 * 24), // Expira en 1 día
                idSesion,
                monto,
                referencia,
                token,
                transaccion: { connect: { id: transaccion.id } }
            }
        })
        return formatResponse('00', { idSesion, token: parseInt(token), transaccion }, 'Token enviado exitosamente al email', true)
    } catch (error) {
        return formatResponse('07', {}, 'Inicialización de pago fallida', false)
    }
}

export default realizarPago
