import prisma from '../prismaClient.js'
import formatResponse from '../utils/responseHelper.js'

// Registrar cliente
const registrarCliente = async (args) => {
    const { documento, nombres, email, celular } = args

    if (!documento || !nombres || !email || !celular) {
        return formatResponse(false, '01', 'Faltan parámetros, (documento, nombres, email y celular) son requeridos.', {})
    }

    try {
        const existingUser = await prisma.user.findUnique({ where: { documento } })
        if (existingUser) {
            return formatResponse(false, '02', `Usuario con el documento ${documento} ya existe.`, {})
        }

        await prisma.user.create({
            data: {
                documento,
                nombres,
                email,
                celular,
                billetera: { create: { saldo: 0 } }
            }
        });

        return formatResponse(true, '00', 'Usuario registrado exitosamente.', {})
    } catch (error) {
        return formatResponse(false, '07', 'Registro fallido', {})
    }
};

export default registrarCliente
