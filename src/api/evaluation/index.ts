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
    res.send(evaluation);

  } catch (err) {
    return res.status(504).end("at evaluation, unknow server error, it is probably matter of server or database server");
  }
});

router.post('/', async (req: express.Request, res: express.Response) => {
  let result
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

    result = await query.upsertEvaluationByUserId({
      user_admin_id,
      user_id,
      score,
      comment
    });
    res.send(result);
  } catch (err) {
    return res.status(403).send("/evaluation put, INTERNAL_SERVER_ERROR : " + err);
  }


});



export default router;