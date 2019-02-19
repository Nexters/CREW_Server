import express from "express";
import * as query from "../../query";
import * as mw from "../../middleware";
import { EvaluationAttributes } from "../../models/evaluation";
import { db } from "../../app";
import AppResult  from "../../util/index";

const router = express.Router();


router.use(mw.jsonMiddleware);
router.use(mw.urlencodedMiddleware);
router.use(mw.expressJwt);
router.use(mw.corsMiddleware);
router.options('*', mw.corsMiddleware);


router.get('/', async (req: express.Request, res: express.Response) => { 
  const user_id = req.query.user_id;

  if(!user_id){
    return new AppResult(null,404,"/evaluation get ","error_not_specified_user_id").Excute(res);
  }
  try{

    const evaluation   = await query.getEvaluationByUserId({user_id});
    evaluation.Excute(res);

  }catch(err){
    return new AppResult(null,504,"get : /evaluation ",err).Excute(res);
  }
});

router.post('/', async (req: express.Request, res: express.Response) => { 
  const user_id = req.query.user_id;

  const score = req.body.score;
  const comment = req.body.comment;
  const user_admin_id = req.user.id;

  
  try {
    const result : AppResult = await query.upsertEvaluationByUserId({
      user_admin_id,
      user_id,
      score,
    comment
    })
    
    return result.Excute(res);
  } catch (err) {
    return new AppResult(null,504,"post evaluation","failed_to_await").Excute(res);
  }
});



export default router;