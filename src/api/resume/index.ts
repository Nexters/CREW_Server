import express from "express";
import * as mw from "../../middleware";
import * as query from "../../query";
import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";
import uuid from "uuid";
import path from "path";
import { FormType } from "../../models/form";


const router = express.Router();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESSKEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESSKEY,
  region: 'ap-northeast-2'
});
const s3 = new AWS.S3();

const s3upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    key: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const fileName = `${uuid.v4()}${ext}`;
      cb(null, fileName);
    },
    contentType: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, ext);
    }
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if(ext !== '.pdf' && ext !== '.zip' && ext !== '.pptx' && ext != '.ppt') {
      return cb(null, false);
    }
    cb(null, true);
  }
})



router.use(mw.jsonMiddleware);
router.use(mw.urlencodedMiddleware);
router.use(mw.expressJwt);
router.use(mw.corsMiddleware);
router.options('*', mw.corsMiddleware);

router.get('/', async (req: express.Request, res: express.Response) => {
  const user_id = req.user.id;
  try {
    const resumes = await query.findResumesByUserId({user_id});
    res.send(resumes);
  } catch (err) {
    return res.status(404).end(`get resume: ${err}`);
  }
});

router.get('/read', async (req: express.Request, res: express.Response) => {
  const admin_id = req.user.id;
  const user_id = req.query.user_id
  try {
    const admin = await query.findUserAdmin({id: admin_id});
    if(!admin) { return res.status(404).end(); }
    const resumes = await query.findResumesByUserId({user_id});
    res.send(resumes);
  } catch (err) {
    return res.status(404).end(`get resumes/read: ${err}`);
  }
});


router.post('/', s3upload.single('pdfFile'), async (req: express.Request, res: express.Response) => {
  const user_id = req.user.id;
  const form_id = req.body.form_id;
  const answer = req.body.answer;
  
  try {
    const form = await query.findFormById({form_id});
    if (!form) { return res.status(404).end() }
    if (form.type == FormType.Upload) {
      if(req.file == undefined) {
        return res.status(404).end('post resumes: file undefined');
      }
      const answer = (req.file as any).location;
      const Resume = await query.updateORcreateResume({answer, form_id, user_id});
      if(!Resume) { return res.status(404).end('post resumes: resume(upload type) not found'); }
      res.send(Resume);
    }
    const Resume = await query.updateORcreateResume({answer, form_id, user_id});
    if(!Resume) { return res.status(404).end(`post resumes: resume(not upload type)`) }
    res.send(Resume);
  } catch (err) {
    return res.status(404).end(`post resumes: ${err} `);
  }
});

export default router;