import prisma from '../prismaClient.js'
import formatResponse from '../utils/responseHelper.js'
import { generateToken, generateSessionId } from '../utils/tokenGenerator.js'
import sendEmail from '../utils/mailService.js'

const realizarPago = async (args) => {
    const { document, phone, amount } = args;

    if (!document || !phone || !amount || amount <= 0) {
        return formatResponse(false, '01', 'Parámetros inválidos', {});
    }

    try {
        const user = await prisma.user.findUnique({ where: { document } });

        if (!user || user.phone !== phone) {
            return formatResponse(false, '02', 'Usuario no encontrado o número de celular no coincide', {});
        }

        const wallet = await prisma.wallet.findUnique({ where: { document } });

        if (wallet.balance < amount) {
            return formatResponse(false, '03', 'Saldo insuficiente', {});
        }

        const token = generateToken();
        const sessionId = generateSessionId();

        // Enviar el token por correo
        await sendEmail(user.email, token);

        // Guardar la sesión en la base de datos
        await prisma.transactionSession.create({
            data: {
                document,
                sessionId,
                amount,
                token
            }
        });

        return formatResponse(true, '00', 'Token enviado exitosamente al email', { sessionId });
    } catch (error) {
        return formatResponse(false, '07', 'Inicialización de pago fallida', {});
    }
};

export default realizarPago
