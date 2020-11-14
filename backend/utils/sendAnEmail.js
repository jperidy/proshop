import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

const sendAnEmail = (user) => {

    var transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_ACCOUNT,
            pass: process.env.EMAIL_PSW
        }
    });

    var mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "proshop",
            link: "proshop.com",
        },
    });

    var response = {
        body: {
            name: user.name,
            intro: "Welcome to proshope online store",
            outro: "Looking forward to do more business with you",
        }
    };

    var mail = mailGenerator.generate(response);
    var mailText = mailGenerator.generatePlaintext(response);

    var mailOptions = {
        from: process.env.EMAIL_ACCOUNT,
        to: user.email,
        subject: 'Signup successful - Welcome to proshop',
        text: mailText,
        html: mail
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

};

export default sendAnEmail;
