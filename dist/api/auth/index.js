"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const app_1 = require("../../app");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.send('I am auth router');
});
passport_1.default.serializeUser((user, done) => {
    done(null, `${user.member_provider}:${user.member_provider_number}`);
});
passport_1.default.deserializeUser((str, done) => {
    const [member_provider, member_provider_number] = str.split(':');
    app_1.db.User.findOne({ where: { member_provider: member_provider, member_provider_number: member_provider_number } })
        .then((user) => {
        if (user) {
            done(null, user);
        }
        else {
            done(new Error('해당 정보와 일치하는 사용자가 없습니다.'));
        }
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map