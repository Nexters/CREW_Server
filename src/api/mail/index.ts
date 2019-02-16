import express from "express";
import nodemailer from "nodemailer";

import { db } from "../../app";

const router = express.Router();

router.post('/', async (req: express.Request, res: express.Response) => {
  let account = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_ADDRESS,
      pass: process.env.MAIL_PASSWORD
    }
  });
  const { mailList, mail_title, mail_context } = req.body;

  for (const user of mailList) {
    let mailOptions = {
      from: '"NEXTERS" <teamnexters@gmail.com>', // sender address
      to: user.mail, // list of receivers
      subject: mail_title, // Subject line
      // text: "Hello world", // plain text body
      html: `<b>${user.name} ${mail_context}</b>` // html body
    };
    let info = await transporter.sendMail(mailOptions);

    console.log("Message sent: ", info.messageId, user.name);
    console.log("Preview URL: ", nodemailer.getTestMessageUrl(info));
  }
  res.send({ message: "mail send seccess" });
});
export default router;