const nodemailer = require('nodemailer')


// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'zechariah.okuneva30@ethereal.email',
//         pass: 'dKes74ksd21bjV5nv4'
//     }
// });

// Config
const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
})

// Send mail
const sendMail = (info) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await transport.sendMail(info)
            console.log('Message sent: %s', result.messageId)
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(result))

            resolve(result)
        } catch (error) {
            console.log('Send mail => ', error)
            reject(error)
        }
    })
}

// Mailer
exports.mailer = ({email, pin, type}) => {
    let info = ''
    // let EMAIL = []
    //
    // if (email.length === 1) {
    //     EMAIL = email[0]
    // } else {
    //     EMAIL = email
    // }

    switch (type) {
        case 'request-reset-password':
            info = {
                from: `Masoud Dev, ${process.env.EMAIL_USERNAME}`,
                to: email,
                subject: "Password Reset Pin",
                text: `Hello, Here is your password reset pin ${pin} this pin will expire in 1 day`,
                html: `<p>Hello, </p><p>Here is your password reset pin <b>${pin}</b> this pin will expire in 1 day</p>`,
            }

            console.log('Pin => ', pin)

            sendMail(info)
            break

        case 'update-reset-password':
            info = {
                from: `Masoud Dev, ${process.env.EMAIL_USERNAME}`,
                to: email,
                subject: "Password Updated",
                text: `Hello, Your new password has been update`,
                html: `<p>Hello, </p><p>Your new password has been update</p>`,
            }

            sendMail(info)
            break

        default:
            break
    }
}