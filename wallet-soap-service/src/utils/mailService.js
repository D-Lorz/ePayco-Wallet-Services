import nodemailer from 'nodemailer'

const  { USER_MAIL, PASS_MAIL, HOST_MAIL, SERVICE_MAIL } = process.env;

const transporter = nodemailer.createTransport({
    service: SERVICE_MAIL,
    host: HOST_MAIL,
    port: 465,
    secure: true,
    auth: {
        user: USER_MAIL,
        pass: PASS_MAIL
    }
});

const sendEmail = async (email, token) => {
    const mailOptions = {
        from: {
            name: 'Wallet Test Dev',
            address: USER_MAIL
        },
        to: email,
        subject: 'Payment Token',
        text: `Your payment token is: <b>${token}</b>`
    };

    await transporter.sendMail(mailOptions);
};

export default sendEmail
