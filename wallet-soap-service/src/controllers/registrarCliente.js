import prisma from '../prismaClient.js'
import formatResponse from '../utils/responseHelper.js'

const registrarCliente = async (args) => {
    const { documento, nombres, email, celular } = args

    if (!documento || !nombres || !email || !celular) {
        return formatResponse('01', {}, 'Faltan parámetros, (documento, nombres, email y celular) son requeridos.', false)
    }

    try {
        // Verify Prisma connection
        await prisma.$connect()

        const existingUser = await prisma.usuario.findUnique({
            where: { documento }
        })

        if (existingUser) {
            return formatResponse('02', {}, `Usuario con el documento ${documento} ya existe.`, false)
        }

        const newUser = await prisma.usuario.create({
            data: {
                billetera: {
                    create: {
                        saldo: 0
                    }
                },
                celular,
                documento,
                email,
                nombres
            },
            include: {
                billetera: true
            }
        })

        return formatResponse('00', { usuario: newUser }, 'Usuario registrado exitosamente.', true)
    } catch (error) {
        console.error('Error en registrarCliente: ', error)
        return formatResponse('07', {}, 'Registro fallido: ' + error.message, false)
    } finally {
        await prisma.$disconnect()
    }
}

export default registrarCliente
