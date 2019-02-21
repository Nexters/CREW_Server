import express from "express";
import * as query from "../../query";
import * as mw from "../../middleware";
import { type } from "os";
import { isNumber } from "util";

const router = express.Router();


router.use(mw.jsonMiddleware);
router.use(mw.urlencodedMiddleware);
router.use(mw.expressJwt);
router.use(mw.corsMiddleware);
router.options('*', mw.corsMiddleware);


router.get('/read', async (req: express.Request, res: express.Response) => {
  const user_id = req.query.user_id;

  let user_admin_id = req.user.id;

  let isUserAdmin = await query.findUserAdmin({ id: user_admin_id });

  if (!isUserAdmin) {
    return res.status(403).end("USER_IS_NOT_ADMIN at /evaluation get");
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

router.put('/', async (req: express.Request, res: express.Response) => {
  let result;
  const user_id = req.query.user_id;
  const score = req.body.score;
  const comment = req.body.comment;

  let user_admin_id = req.user.id;

  if (!isNumber(score)) {
    return res.status(400).send("/evaluation put, INVALID_SCORE_TYPE");
  }
  if (score > 100 || score < 0) {
    return res.status(400).send("/evaluation put, INVALID_EVALUATION_SCORE");
  }

  let isUserAdmin = await query.findUserAdmin({ id: user_admin_id });

  if (!isUserAdmin) {
    return res.status(403).send("/evaluation put, user is not authorize as admin");
  }

  try {

    result = await query.upsertEvaluationByUserId(
      user_admin_id,
      user_id,
      score,
      comment
    )
  } catch (err) {
    return res.status(403).send("/evaluation put, INTERNAL_SERVER_ERROR : " + err);
  }
  return res.send(result);


});



export default router;