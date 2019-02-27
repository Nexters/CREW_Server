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
/**
* @swagger
* /evaluations/read?user_id=1:
*   get:
*     summary: admin이 선택한 user의 평가(evaluations)를 가져온다.
*     tags: [Evaluation]
*     parameters:
*      - in: user
*        name: id
*        type: integer
*        value: 1
*        description: 접속한 id값으로 admin인지 판단한다.
*      - in: query
*        name: user_id
*        type: integer
*        value: 2
*        description: user_id값으로 admin이 해당 user_id를 가진 사람의 evaluations을 가져온다.
*     responses:
*      200:
*       description: admin인지 판단후 query로 받은 user_id에 해당하는 user의 evaluations을 가져온다.
*       type: array
*       properties:
*        evaluations:
*         items:
*          $ref: '#/definitions/Evaluation'
*      403:
*       $ref: '#/components/res/Forbidden'
*      404:
*       $ref: '#/components/res/NotFound'
*      500:
*       $ref: '#/components/res/BadRequest'
*/
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
/**
* @swagger
* /Evaluations:
*   post:
*     summary: admin이 해당 user의 evaluation을 추가한다.
*     tags: [Evaluation]
*     parameters:
*      - in: user
*        name: id
*        type: integer
*        description: 접속한 id에 해당하는 resume을 생성한다.
*      - in: body
*        name: user_id
*        type: integer
*        value: 1
*        description: 평가 대상의 user_id이다.
*      - in: body
*        name: score
*        type: integer
*        value: 90
*        description: 평가 대상에 대한 점수이다.
*      - in: body
*        name: comment
*        type: string
*        description: 평가 대상에 대한 comment이다.
*     responses:
*      200:
*       description: user가 이미 평가를 가지고있다면 update를 하고 아니라면 create를 한다.
*       properties:
*        result:
*          $ref: '#/definitions/Evaluation'
*      403:
*       $ref: '#/components/res/Forbidden'
*      404:
*       $ref: '#/components/res/NotFound'
*      500:
*       $ref: '#/components/res/BadRequest'
*/
router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let result;
    const user_id = req.body.user_id;
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