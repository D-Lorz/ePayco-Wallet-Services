import prisma from '../prismaClient.js'
import formatResponse from '../utils/responseHelper.js'

// Confirmar pago
const confirmarPago = async (args) => {
    const { sessionId, token } = args;

    if (!sessionId || !token) {
        return formatResponse(false, '01', 'Parámetros inválidos', {});
    }

    try {
        const session = await prisma.transactionSession.findUnique({ where: { sessionId } });

        if (!session || session.token !== token) {
            return formatResponse(false, '02', 'Token o sesión inválidos', {});
        }

        // Descontar el saldo
        await prisma.wallet.update({
            where: { document: session.document },
            data: { balance: { decrement: session.amount } }
        });

        // Eliminar la sesión
        await prisma.transactionSession.delete({ where: { sessionId } });

        return formatResponse(true, '00', 'Pago confirmado exitosamente', {});
    } catch (error) {
        return formatResponse(false, '07', 'Confirmación de pago fallida', {});
    }
};

export default confirmarPago
