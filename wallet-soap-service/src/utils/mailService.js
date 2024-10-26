import nodemailer from 'nodemailer'

const { USER_MAIL, PASS_MAIL, SMTP_HOST_MAIL, PORT_MAIL } = process.env

const transporter = nodemailer.createTransport({
    auth: {
        pass: PASS_MAIL,
        user: USER_MAIL
    },
    host: SMTP_HOST_MAIL,
    port: PORT_MAIL
})

const sendEmail = async (email, token) => {
    const mailOptions = {
        from: {
            address: USER_MAIL,
            name: 'Wallet Test Dev'
        },
        subject: 'Payment Token',
        text: `Your payment token is: <b>${token}</b>`,
        to: email
    }

    const info = await transporter.sendMail(mailOptions)

    console.log('\nMensaje enviado: %s', info.messageId)
}

export default sendEmail
