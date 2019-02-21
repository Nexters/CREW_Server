import express from "express";
import * as query from "../../query";
import * as mw from "../../middleware";
import { CheckDataValidity } from "../../util/index";
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

    console.log("/get post");

    if (!(position == PositionType.Designer || position == PositionType.Developer)) {
        return res.status(500).send("POSITION_IS_INVALID AT /form get");
    }

    try {
        result = await query.getForm(position);
    } catch (err) {
        return res.status(500).send("INTERNAL_SERVER_ERROR AT /form get");
    }

    res.send(result);

});

router.put('/', async (req: express.Request, res: express.Response) => {

    let result;

    console.log("/form post");

    let user_admin_id = req.user.id;

    let isUserAdmin = await query.findUserAdmin({ id: user_admin_id });

    if (!isUserAdmin) {
        return res.status(403).send("USER_IS_NOT_ADMIN at /form put");
    }

    let err: boolean = CheckDataValidity(req.body);

    if (err) {
        return res.status(500).send("SOME_OF_DATAS_ARE_NOT_SPECIFIED_EITHER_OR_REQUESTED_WRONG_FORM_TYPE");
    }

    try {
        result = await query.upsertForm(req.body);
    } catch (err) {
        return res.status(500).send(err);
    }
    res.send(result);
});

router.delete('/', async (req: express.Request, res: express.Response) => {

    let result, user_admin_id, isUserAdmin, question_num, position;

    console.log("/form delete");

    user_admin_id = req.user.id;
    question_num = req.query.question_num;
    position = req.query.position;

    if (!(position == PositionType.Designer || position == PositionType.Developer)) {
        return res.status(500).send("POSITION_IS_INVALID AT /form get");
    }

    try {
        isUserAdmin = await query.findUserAdmin({ id: user_admin_id });
    } catch (err) {
        return res.status(500).send("INTERNAL_SERVER_ERROR at /form delete");
    }

    if (!isUserAdmin) {
        return res.status(403).send("USER_IS_NOT_ADMIN at /form delete");
    }


    if (question_num < 0) {
        return res.status(500).send("INVALID_IS_ONLY_PERMITTED_AS_NON_NEGATIVE at /form delete");
    }

    try {
        result = await query.deleteFormItem({ question_num, position });
    } catch (err) {
        return res.status(500).send(err);
    }

    if (!result) {
        return res.status(500).send("FAILED_TO_DELETE_FORM_ITEM at /form delete, there is good chance that specified form item does not exist in database server");
    }

    res.send(result);
});



export default router;
