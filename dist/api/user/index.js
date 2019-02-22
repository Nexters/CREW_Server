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
const router = express_1.default.Router();
router.use(mw.jsonMiddleware);
router.use(mw.urlencodedMiddleware);
router.use(mw.expressJwt);
router.use(mw.corsMiddleware);
router.use('*', mw.corsMiddleware);
router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const id = req.user.id;
        const admin = yield query.findUserAdmin({ id: id });
        if (!admin) {
            const user = yield query.findUserById({ id });
            if (!user) {
                return res.status(404).end('get users/ : not admin and not found user');
            }
            res.send(user);
        }
        const users = yield query.findAllUsers();
        if (!users) {
            return res.status(404).end(`get users/ : admin but not found user list`);
        }
        res.send(users);
    }
    catch (err) {
        return res.status(404).end(`get users: ${err}`);
    }
}));
router.get('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield query.findUserById({ id });
        if (!user) {
            return res.status(404).end('get users/:id : not found user');
        }
        res.send(user);
    }
    catch (err) {
        return res.status(404).end(`get users/:id : ${err}`);
    }
}));
router.put("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const id = req.user.id;
        const name = req.body.name;
        const age = req.body.age;
        const phone_number = req.body.phone_number;
        const email = req.body.email;
        const job = req.body.job;
        const position = req.body.position;
        const updated_user = yield query.updateUserInfo({ id, name, age, phone_number, email, job, position });
        if (!updated_user) {
            return res.status(404).end(`put users/ : not found updated_user`);
        }
        res.send(updated_user);
    }
    catch (err) {
        return res.status(500).send(`put users/ : ${err}`); // err : user 정보 업데이트 실패
    }
}));
exports.default = router;
//# sourceMappingURL=index.js.map