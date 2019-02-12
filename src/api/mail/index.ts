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
  const { mailList, context } = req.body;

  for (const user of mailList) {
    let mailOptions = {
      from: '"NEXTERS" <teamnexters@gmail.com>', // sender address
      to: user.mail, // list of receivers
      subject: "Hello", // Subject line
      text: "Hello world ?", // plain text body
      html: `<b>${user.name} ${context}</b>` // html body
    };
    let info = await transporter.sendMail(mailOptions);

    console.log("Message sent: % s", info.messageId, user.name);
    console.log("Preview URL: % s", nodemailer.getTestMessageUrl(info));
  }

  res.send(
    {
      message: "success"
    }
  );
});

export default router;



