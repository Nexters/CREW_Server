import express from "express";
import * as query from "../../query";
import * as mw from "../../middleware";
import { EvaluationAttributes } from "../../models/evaluation";
import { db } from "../../app";

const router = express.Router();


router.use(mw.jsonMiddleware);
router.use(mw.urlencodedMiddleware);
router.use(mw.expressJwt);
router.use(mw.corsMiddleware);
router.options('*', mw.corsMiddleware);




router.get('/', async (req: express.Request, res: express.Response) => { // get : evaluation
  const id = req.params.id;
  const user = await query.findUserById({ id });
  res.send(user);
});

router.post('/', async (req: express.Request, res: express.Response) => { // post : evaluation
  const user_id = req.query.user_id;

  const score = req.body.score;
  const comment = req.body.comment;
  const user_admin_id = req.user.id;

  
  try {
    const result = await query.upsertEvaluationByUserId({
      user_admin_id,
      user_id,
      score,
    comment

    })
  } catch (err) {
    console.log(err);
  }
});



export default router;