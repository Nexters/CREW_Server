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
const mw = __importStar(require("../../middleware"));
const query = __importStar(require("../../query"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const uuid_1 = __importDefault(require("uuid"));
const path_1 = __importDefault(require("path"));
const form_1 = require("../../models/form");
const router = express_1.default.Router();
aws_sdk_1.default.config.update({
    accessKeyId: process.env.AWS_ACCESSKEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESSKEY,
    region: 'ap-northeast-2'
});
const s3 = new aws_sdk_1.default.S3();
const s3upload = multer_1.default({
    storage: multer_s3_1.default({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        key: (req, file, cb) => {
            const ext = path_1.default.extname(file.originalname);
            const fileName = `${uuid_1.default.v4()}${ext}`;
            cb(null, fileName);
        },
        contentType: (req, file, cb) => {
            const ext = path_1.default.extname(file.originalname);
            cb(null, ext);
        }
    }),
    fileFilter: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        if (ext !== '.pdf' && ext !== '.zip' && ext !== '.pptx' && ext != '.ppt') {
            return cb(null, false);
        }
        cb(null, true);
    }
});
router.use(mw.jsonMiddleware);
router.use(mw.urlencodedMiddleware);
router.use(mw.expressJwt);
router.use(mw.corsMiddleware);
router.options('*', mw.corsMiddleware);
router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const user_id = req.user.id;
    try {
        const resumes = yield query.findResumesByUserId({ user_id });
        res.send(resumes);
    }
    catch (err) {
        return res.status(404).end(`get resume: ${err}`);
    }
}));
router.get('/read', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const admin_id = req.user.id;
    const user_id = req.query.user_id;
    try {
        const admin = yield query.findUserAdmin({ id: admin_id });
        if (!admin) {
            return res.status(404).end();
        }
        const resumes = yield query.findResumesByUserId({ user_id });
        res.send(resumes);
    }
    catch (err) {
        return res.status(404).end(`get resumes/read: ${err}`);
    }
}));
router.post('/', s3upload.single('pdfFile'), (req, res) => __awaiter(this, void 0, void 0, function* () {
    const user_id = req.user.id;
    const form_id = req.body.form_id;
    const answer = req.body.answer;
    try {
        const form = yield query.findFormById({ form_id });
        if (!form) {
            return res.status(404).end();
        }
        if (form.type == form_1.FormType.Upload) {
            if (req.file == undefined) {
                return res.status(404).end('post resumes: file undefined');
            }
            const answer = req.file.location;
            const Resume = yield query.updateORcreateResume({ answer, form_id, user_id });
            if (!Resume) {
                return res.status(404).end('post resumes: resume(upload type) not found');
            }
            res.send(Resume);
        }
        const Resume = yield query.updateORcreateResume({ answer, form_id, user_id });
        if (!Resume) {
            return res.status(404).end(`post resumes: resume(not upload type)`);
        }
        res.send(Resume);
    }
    catch (err) {
        return res.status(404).end(`post resumes: ${err} `);
    }
}));
exports.default = router;
//# sourceMappingURL=index.js.map