import express from "express";
import nodemailer from "nodemailer";

import { db } from "../../app";

const router = express.Router();

 /**
 * @swagger
 * /mail:
 *   post:
 *     summary: mail을 보낸다.
 *     tags: [Mail]
 *     parameters: 
 *      - in: body
 *        name: mailList
 *        type: user array
 *        description: mail을 보내기위한 user의 정보들이 들어있다. user.mail, user.name
 *      - in: body
 *        name: mail_title
 *        type: string 
 *        description: mail의 title을 받아온다.
 *      - in: body
 *        name: mail_context
 *        type: string
 *        description: mail의 내용을 받아온다.
 *     responses: 
 *      200: 
 *       description: 성공하면 'mail send seccess' message가 넘어온다.
 *      403: 
 *       $ref: '#/components/res/Forbidden'
 *      404: 
 *       $ref: '#/components/res/NotFound'
 *      500: 
 *       $ref: '#/components/res/BadRequest'
 */
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