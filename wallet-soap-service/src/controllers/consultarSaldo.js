import prisma from '../prismaClient.js'
import formatResponse from '../utils/responseHelper.js'

// Consultar saldo
const consultarSaldo = async (args) => {
    const { documento, celular } = args

    if (!documento || !celular) {
        return formatResponse(false, '01', 'Parámetros inválidos', {})
    }

    try {
        const usuario = await prisma.usuario.findUnique({ where: { documento } })

        if (!usuario || usuario.celular !== celular) {
            return formatResponse('02', {}, 'Usuario no encontrado o número de celular no coincide', false)
        }

        const billetera = await prisma.billetera.findUnique({ where: { documento } })

        return formatResponse('00', { saldo: billetera.saldo }, 'Saldo consultado exitosamente', true)
    } catch (error) {
        return formatResponse('07', {}, 'Error al consultar saldo', false)
    }
}

export default consultarSaldo
