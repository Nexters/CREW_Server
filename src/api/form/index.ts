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

    if (!(position == PositionType.Designer || position == PositionType.Developer)) {
        return res.status(500).send("POSITION_IS_INVALID AT /form get");
    }

    try {
        const forms = await query.getForm({position});
        res.send(forms);
    } catch (err) {
        return res.status(500).send("INTERNAL_SERVER_ERROR AT /form get");
    }



});

router.post('/', async (req: express.Request, res: express.Response) => {

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

router.delete('/:id', async (req: express.Request, res: express.Response) => {


    console.log("/form delete");

    const user_admin_id = req.user.id;
    const form_id = req.params.id;
    let isUserAdmin;
    
    try {
        isUserAdmin = await query.findUserAdmin({ id: user_admin_id });
    } catch (err) {
        return res.status(500).send("INTERNAL_SERVER_ERROR at /form delete");
    }

    if (!isUserAdmin) {
        return res.status(403).send("USER_IS_NOT_ADMIN at /form delete");
    }

    try {
        const result = await query.deleteFormItem({ form_id });
        if (!result) {
            return res.status(500).send("FAILED_TO_DELETE_FORM_ITEM at /form delete, there is good chance that specified form item does not exist in database server");
        }
        res.send(result);
    } catch (err) {
        return res.status(500).send(err);
    }
    
});



export default router;
