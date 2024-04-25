const nodemailer = require("nodemailer") 

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 25,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "uat.nytech@gmail.com",
      pass: "sscymaqwqsnjbqzt",
    },
  });

sendEmail= async (to, subject, body) =>{
    const info = await transporter.sendMail({
        from: '"Project Management Team"<uat.nytech@gmail.com>', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: body, // plain text body // html body
      });
      console.log("Message sent: %s", info.messageId);
}

module.exports = { sendEmail}