"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const router = express_1.default.Router();
/**
* @swagger
* /mail:
*   post:
*     summary: mail을 보낸다.
*     tags: [Mail]
*     parameters:
*      - in: body
*        name: mailList
*        type: array[user]
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
router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let account = yield nodemailer_1.default.createTestAccount();
    let transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_ADDRESS,
            pass: process.env.MAIL_PASSWORD
        }
    });
    const { mailList, mail_title, mail_context } = req.body;
    for (const user of mailList) {
        let mailOptions = {
            from: '"NEXTERS" <teamnexters@gmail.com>',
            to: user.mail,
            subject: mail_title,
            // text: "Hello world", // plain text body
            html: `<b>${user.name} ${mail_context}</b>` // html body
        };
        let info = yield transporter.sendMail(mailOptions);
        console.log("Message sent: ", info.messageId, user.name);
        console.log("Preview URL: ", nodemailer_1.default.getTestMessageUrl(info));
    }
    res.send({ message: "mail send seccess" });
}));
exports.default = router;
//# sourceMappingURL=index.js.map