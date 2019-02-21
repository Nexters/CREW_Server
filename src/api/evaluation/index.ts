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


router.get('/', async (req: express.Request, res: express.Response) => {
  const user_id = req.query.user_id;

  let user_admin_id = req.user.id;
  
  let isUserAdmin = await query.findUserAdmin({id : user_admin_id});

  if (!isUserAdmin) {
    return res.status(403).end("at evaluation get : clinet is not authorized");
  }


  if (!user_id) {
    return res.status(404).end("at evaluation get : specified user does not exists");
  }
  try {

    const evaluation = await query.getEvaluationByUserId({ user_id });
    return res.send(evaluation);

  } catch (err) {
    return res.status(504).end("at evaluation, unknow server error, it is probably matter of server or database server");
  }
});

router.post('/', async (req: express.Request, res: express.Response) => {
  const user_id = req.query.user_id;

  const score = req.body.score;
  const comment = req.body.comment;

  let user_admin_id = req.user.id;

  let isUserAdmin = await query.findUserAdmin({id : user_admin_id});
  
  if (!isUserAdmin) {
    return res.status(403).send("/evaluation post, user is not authorize as admin");
  }

  try {
    const result = await query.upsertEvaluationByUserId({
      user_admin_id,
      user_id,
      score,
      comment
    })

    return res.send(result);
  } catch (err) {
    return res.status(504).end("at evaluation, unknow server error, it is probably matter of server or database server");
  }
});



export default router;