"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_jwt_1 = __importDefault(require("express-jwt"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
function loginRequired(req, res, next) {
    if (req.user) {
        next();
    }
    else {
        res.redirect('/auth');
    }
}
exports.loginRequired = loginRequired;
function insertReq(req, res, next) {
    res.locals.req = req;
    next();
}
exports.insertReq = insertReq;
function insertToken(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
}
exports.insertToken = insertToken;
exports.jsonMiddleware = body_parser_1.default.json();
exports.urlencodedMiddleware = body_parser_1.default.urlencoded({ 'extended': false });
exports.expressJwt = express_jwt_1.default({ 'secret': process.env.JWT_SECRET });
exports.corsMiddleware = cors_1.default({ 'origin': process.env.TARGET_ORIGIN });
//# sourceMappingURL=middleware.js.map