import express from "express";
import * as query from "../../query";
import * as mw from "../../middleware";
import AppResult from "../../util/index";
import { PositionType } from "../../models/form";

const router = express.Router();


router.use(mw.jsonMiddleware);
router.use(mw.urlencodedMiddleware);
router.use(mw.expressJwt);
router.use(mw.corsMiddleware);
router.options('*', mw.corsMiddleware);




router.get('/', async (req: express.Request, res: express.Response) => {
    let position: PositionType = req.query.position;
    let result;

    try {
        result = await query.getForm(position);
    } catch (err) {
        return new AppResult(null, 504, "get : /form", err).Excute(res);
    }

    result.Excute(res);

});


router.post('/', async (req: express.Request, res: express.Response) => {

    let  result;
    console.log("/form post");
    try {
        result = await query.createForm(req.body);
    }catch(err){
        return new AppResult(null, 504, "post : /form", err).Excute(res);
    }
    result.Excute(res);
});



export default router;
