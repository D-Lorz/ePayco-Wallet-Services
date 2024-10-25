import prisma from '../prismaClient.js'
import formatResponse from '../utils/responseHelper.js'

// Recarga de billetera
const recargarBilletera = async (args) => {
    const { document, phone, amount } = args;

    if (!document || !phone || !amount || amount <= 0) {
        return formatResponse(false, '01', 'Parámetros inválidos', {});
    }

    try {
        const user = await prisma.user.findUnique({ where: { document } });

        if (!user || user.phone !== phone) {
            return formatResponse(false, '02', 'Usuario no encontrado o número de celular no coincide', {});
        }

        await prisma.wallet.update({
            where: { document },
            data: { balance: { increment: amount } }
        });

        return formatResponse(true, '00', 'Billetera recargada exitosamente', { });
    } catch (error) {
        return formatResponse(false, '07', 'Recarga fallida', {});
    }
};

export default recargarBilletera
