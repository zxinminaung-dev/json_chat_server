const nodemailer = require("nodemailer");
const express = require('express')
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 25,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "uat.nytech@gmail.com",
    pass: "sscymaqwqsnjbqzt",
  },
});
const router = express.Router();

router.get('/test',async (req,res)=>{
    const info = await transporter.sendMail({
        from: '"NY UAT 👻"<uat.nytech@gmail.com>', // sender address
        to: "zxinminaung.dev@gmail.com", // list of receivers
        subject: "User Registration Success", // Subject line
        text: "Your Registration is success <br> Please use this otp code to finish Registartion", // plain text body // html body
      });
      console.log("Message sent: %s", info.messageId);
    res.json({messageId: info.messageId})
})
module.exports = router;

