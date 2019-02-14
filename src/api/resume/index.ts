import express from "express";
import * as mw from "../../middleware";
import * as query from "../../query";
import { ResumeInstance } from "../../models/resume";

const router = express.Router();

router.use(mw.jsonMiddleware);
router.use(mw.urlencodedMiddleware);
router.use(mw.expressJwt);
router.use(mw.corsMiddleware);
router.options('*', mw.corsMiddleware);

router.get('/', async (req: express.Request ,res: express.Response) => {
  const user_id = req.user.id;
  console.log(user_id)
  const resumes: ResumeInstance[] = await query.findResumesByUserId({user_id});
  res.send(resumes);
});

export default router;