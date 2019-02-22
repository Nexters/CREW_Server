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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const query = __importStar(require("../../query"));
const mw = __importStar(require("../../middleware"));
const util_1 = require("util");
const router = express_1.default.Router();
router.use(mw.jsonMiddleware);
router.use(mw.urlencodedMiddleware);
router.use(mw.expressJwt);
router.use(mw.corsMiddleware);
router.options('*', mw.corsMiddleware);
router.get('/read', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const user_id = req.query.user_id;
    let user_admin_id = req.user.id;
    let isUserAdmin = yield query.findUserAdmin({ id: user_admin_id });
    if (!isUserAdmin) {
        return res.status(403).end("USER_IS_NOT_ADMIN at /evaluation get");
    }
    if (!user_id) {
        return res.status(404).end("at evaluation get : specified user does not exists");
    }
    try {
        const evaluation = yield query.getEvaluationByUserId({ user_id });
        res.send(evaluation);
    }
    catch (err) {
        return res.status(504).end("at evaluation, unknow server error, it is probably matter of server or database server");
    }
}));
router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let result;
    const user_id = req.query.user_id;
    const score = req.body.score;
    const comment = req.body.comment;
    let user_admin_id = req.user.id;
    if (!util_1.isNumber(score)) {
        return res.status(400).send("/evaluation put, INVALID_SCORE_TYPE");
    }
    if (score > 100 || score < 0) {
        return res.status(400).send("/evaluation put, INVALID_EVALUATION_SCORE");
    }
    let isUserAdmin = yield query.findUserAdmin({ id: user_admin_id });
    if (!isUserAdmin) {
        return res.status(403).send("/evaluation put, user is not authorize as admin");
    }
    try {
        result = yield query.upsertEvaluationByUserId({
            user_admin_id,
            user_id,
            score,
            comment
        });
        res.send(result);
    }
    catch (err) {
        return res.status(403).send("/evaluation put, INTERNAL_SERVER_ERROR : " + err);
    }
}));
exports.default = router;
//# sourceMappingURL=index.js.map