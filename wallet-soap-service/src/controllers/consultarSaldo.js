import prisma from '../prismaClient.js'
import formatResponse from '../utils/responseHelper.js'

// Consultar saldo
const consultarSaldo = async (args) => {
    const { document, phone } = args;

    if (!document || !phone) {
        return formatResponse(false, '01', 'Parámetros inválidos', {});
    }

    try {
        const user = await prisma.user.findUnique({ where: { document } });

        if (!user || user.phone !== phone) {
            return formatResponse(false, '02', 'Usuario no encontrado o número de celular no coincide', {});
        }

        const wallet = await prisma.wallet.findUnique({ where: { document } });

        return formatResponse(true, '00', 'Saldo consultado exitosamente', { saldo: billetera.saldo });
    } catch (error) {
        return formatResponse(false, '07', 'Error al consultar saldo', {});
    }
};

export default consultarSaldo
