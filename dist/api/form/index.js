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
const index_1 = require("../../util/index");
const form_1 = require("../../models/form");
const router = express_1.default.Router();
router.use(mw.jsonMiddleware);
router.use(mw.urlencodedMiddleware);
router.use(mw.expressJwt);
router.use(mw.corsMiddleware);
router.options('*', mw.corsMiddleware);
router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let position = req.query.position;
    if (!(position == form_1.PositionType.Designer || position == form_1.PositionType.Developer)) {
        return res.status(500).send("POSITION_IS_INVALID AT /form get");
    }
    try {
        const forms = yield query.getForm({ position });
        res.send(forms);
    }
    catch (err) {
        return res.status(500).send("INTERNAL_SERVER_ERROR AT /form get");
    }
}));
router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let result;
    console.log("/form post");
    let user_admin_id = req.user.id;
    let isUserAdmin = yield query.findUserAdmin({ id: user_admin_id });
    if (!isUserAdmin) {
        return res.status(403).send("USER_IS_NOT_ADMIN at /form put");
    }
    let err = index_1.CheckDataValidity(req.body);
    if (err) {
        return res.status(500).send("SOME_OF_DATAS_ARE_NOT_SPECIFIED_EITHER_OR_REQUESTED_WRONG_FORM_TYPE");
    }
    try {
        result = yield query.upsertForm(req.body);
    }
    catch (err) {
        return res.status(500).send(err);
    }
    res.send(result);
}));
router.delete('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log("/form delete");
    const user_admin_id = req.user.id;
    const form_id = req.params.id;
    let isUserAdmin;
    try {
        isUserAdmin = yield query.findUserAdmin({ id: user_admin_id });
    }
    catch (err) {
        return res.status(500).send("INTERNAL_SERVER_ERROR at /form delete");
    }
    if (!isUserAdmin) {
        return res.status(403).send("USER_IS_NOT_ADMIN at /form delete");
    }
    try {
        const result = yield query.deleteFormItem({ form_id });
        if (!result) {
            return res.status(500).send("FAILED_TO_DELETE_FORM_ITEM at /form delete, there is good chance that specified form item does not exist in database server");
        }
        res.send(result);
    }
    catch (err) {
        return res.status(500).send(err);
    }
}));
exports.default = router;
//# sourceMappingURL=index.js.map