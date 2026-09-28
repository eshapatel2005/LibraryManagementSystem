const nodemailer = require("nodemailer");

exports.sendEmail = async (mailObj) => {
    try {

        const transporter = nodemailer.createTransport({
            service: process.env.SERVICE,
            port: 587,
            secure: true,
            auth: {
                user: process.env.FROM_MAIL,
                pass: process.env.USER_PASS
            }
        });

        const result = await transporter.sendMail(mailObj);

        console.log("Email Sent Successfully");
        
    } catch (error) {

        console.log("Email Not Sent");
        console.log(error.message);

    }
};