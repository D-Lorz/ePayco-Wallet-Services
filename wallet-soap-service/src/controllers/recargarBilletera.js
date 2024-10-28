import prisma from '../prismaClient.js'
import formatResponse from '../utils/responseHelper.js'

// Recarga de billetera
const recargarBilletera = async (args) => {
    const { documento, celular, valor } = args

    if (!documento || !celular || !valor || valor <= 0) {
        return formatResponse('01', {}, 'Parámetros inválidos', false)
    }

    try {
        const usuario = await prisma.usuario.findUnique({ include: { billetera: true }, where: { documento } })

        if (!usuario || usuario.celular !== celular) {
            return formatResponse('02', {}, 'Usuario no encontrado o número de celular no coincide', false)
        }

        // Actualizar Saldo de la Billetera
        const updateBilletera = await prisma.billetera.update({
            data: { saldo: { increment: valor } },
            where: { documento }
        })

        console.log("updateBilletera: ", updateBilletera)

        // Registrar la transacción de recarga
        const agregarTransaccion = await prisma.transaccion.create({
            data: {
                actualizadoEn: new Date(),
                creadoEn: new Date(),
                documento,
                estado: 'Confirmado',
                monto: valor,
                tipo: 'Recarga'
            }
        })

        console.log("agregarTransaccion: ", agregarTransaccion)

        return formatResponse('00', { billetera: updateBilletera }, 'Billetera recargada exitosamente', true)
    } catch (error) {
        return formatResponse('07', {}, 'Recarga fallida', false)
    }
}

export default recargarBilletera
