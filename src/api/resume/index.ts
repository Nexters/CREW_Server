import express from "express";
import * as mw from "middleware";
import * as query from "query";
import AppResult from "util/index";

const router = express.Router();

router.use(mw.jsonMiddleware);
router.use(mw.urlencodedMiddleware);
router.use(mw.expressJwt);
router.use(mw.corsMiddleware);
router.options('*', mw.corsMiddleware);

router.get('/', async (req: express.Request, res: express.Response) => {
  const user_id = req.user.id;
  try {
    const resumes : AppResult = await query.findResumesByUserId({user_id});
    res.send(resumes);
  } catch (err) {
    return res.status(404).end();
  }
});

router.get('/read', async (req: express.Request, res: express.Response) => {
  const admin_id = req.user.id;
  const user_id = req.query.user_id
  try {
    const admin: AppResult = await query.findUserAdmin({id: admin_id});
    if(!admin) { return res.status(404).end(); }
    const resumes: AppResult = await query.findResumesByUserId({user_id});
    res.send(resumes);
  } catch (error) {
    return res.status(404).end();
  }
});

export default router;