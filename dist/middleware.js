"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=middleware.js.map