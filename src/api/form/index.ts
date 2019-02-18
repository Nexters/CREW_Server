import express from "express";
import * as query from "../../query";
import * as mw from "../../middleware";
import AppResult, { CheckDataValidity } from "../../util/index";
import { PositionType } from "../../models/form";

const router = express.Router();


router.use(mw.jsonMiddleware);
router.use(mw.urlencodedMiddleware);
router.use(mw.expressJwt);
router.use(mw.corsMiddleware);
router.options('*', mw.corsMiddleware);

//TODO form Update 할 것인지? 
//TODO json 잘못 들어 왔을 때 클라이언트에 명시적인 오류반환
//TODO 

router.get('/', async (req: express.Request, res: express.Response) => {
    let position: PositionType = req.query.position;
    let result;

    if (!(position == PositionType.Designer || position == PositionType.Developer)) {
        return new AppResult(null, 404, "get /form", "invalid_position_request, server is only bound to get 'Developer' or 'Designer' ").Excute(res);
    }




    try {
        result = await query.getForm(position);
    } catch (err) {
        return new AppResult(null, 504, "get : /form", err).Excute(res);
    }

    result.Excute(res);

});


router.post('/', async (req: express.Request, res: express.Response) => {

    let result;

    console.log("/form post");


    let err : boolean = CheckDataValidity(req.body);


    if(err){
        return new AppResult(null,404,"/form post","you probably missed some data");
    }

    try {
        result = await query.createForm(req.body);
    } catch (err) {
        return new AppResult(null, 504, "post : /form", err).Excute(res);
    }
    result.Excute(res);
});



export default router;
