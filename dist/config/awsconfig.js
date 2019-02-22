"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
module.exports = {
    "accessKeyId": process.env.AWS_ACCESSKEY_ID,
    "secretAccessKey": process.env.AWS_SECRET_ACCESSKEY,
    "region": "ap-northeast-2"
};
//# sourceMappingURL=awsconfig.js.map