const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "rozgaarready@gmail.com",
        pass: "oqxkfsdiqpmkqrcn",
    },
});

async function mail(email, otp) {
    const info = await transporter.sendMail({
    from: "rozgaarready@gmail.com",
    to: email,
    subject: "SIGN-UP OTP",
    text: otp,
  });
  console.log("Message sent: %s", info.messageId);
}

module.exports = main
