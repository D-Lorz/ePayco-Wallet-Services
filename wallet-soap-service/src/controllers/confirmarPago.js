import prisma from '../prismaClient.js'
import formatResponse from '../utils/responseHelper.js'

// Confirmar pago
const confirmarPago = async (args) => {
    const { idSesion, token } = args

    if (!idSesion || !token) {
        return formatResponse('01', {}, 'Parámetros inválidos', false)
    }

    try {
        // Buscar la sesión de transacción
        const session = await prisma.sesionTransaccion.findUnique({ where: { idSesion } })

        if (!session || session.token !== token) {
            return formatResponse('02', {}, 'Token o sesión inválidos', false)
        }

        // Descontar el saldo en la billetera del usuario
        await prisma.billetera.update({
            data: { saldo: { decrement: session.monto } },
            where: { documento: session.documento }
        })

        // Buscar la transacción relacionada con esta sesión
        const transaccion = await prisma.transaccion.findFirst({
            where: {
                documento: session.documento,
                id: session.transaccionId
            }
        })

        if (!transaccion) {
            return formatResponse('03', {}, 'Transacción no encontrada', false)
        }

        // Actualizar el estado de la transacción a "Confirmado"
        const updateTransaccion = await prisma.transaccion.update({
            data: {
                actualizadoEn: new Date(),
                estado: "Confirmado"
            },
            where: { id: transaccion.id }
        })

        // Eliminar la sesión
        await prisma.sesionTransaccion.delete({ where: { idSesion } })

        return formatResponse('00', { transaccion: updateTransaccion }, 'Pago confirmado exitosamente', true)
    } catch (error) {
        console.error(error)
        return formatResponse('07', {}, 'Confirmación de pago fallida', false)
    }
}

export default confirmarPago
