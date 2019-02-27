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


 /**
 * @swagger
 * /forms/:
 *   get:
 *     summary: 자기소개서를 작성할 forms 를가져온다.
 *     tags: [Form]
 *     parameters: 
 *      - in: body
 *        name: position
 *        type: PositionType
 *        enum: [Developer, Designer]
 *        description: 지원한 Position을 받는다.
 *     responses:
 *      200: 
 *       description: position에 맞는 forms를 가져온다.
 *       type: array
 *       properties: 
 *        forms:
 *         items: 
 *          $ref: '#/definitions/Form'
 *      403: 
 *       $ref: '#/components/res/Forbidden'
 *      404: 
 *       $ref: '#/components/res/NotFound'
 *      500: 
 *       $ref: '#/components/res/BadRequest'
 */
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


 /**
 * @swagger
 * /forms/:
 *   post:
 *     summary: admin이 forms을 만든다.
 *     tags: [Form]
 *     parameters: 
 *      - in: user
 *        name: id
 *        type: integer
 *        value: 1
 *        description: 로그인한 user가 admin인지 판단한다.
 *      - in: body
 *        name: question_num
 *        type: integer
 *        value: 2
 *        description: 작성할 form의 question_num이다.
 *      - in: body
 *        name: position
 *        type: PositionType
 *        enum: [Developer, Designer]
 *        description: Position을 입력한다.
 *      - in: body
 *        name: options
 *        type: string
 *        description: form의 type이 selector인 경우에만 옵션으로 strirng으로 값들을 받는다.
 *     responses:
 *      200: 
 *       description: 해당 position에 question_num가 존재하면 update하고 아니면 create한다.
 *       properties: 
 *        result:
 *          $ref: '#/definitions/Form'
 *      403: 
 *       $ref: '#/components/res/Forbidden'
 *      404: 
 *       $ref: '#/components/res/NotFound'
 *      500: 
 *       $ref: '#/components/res/BadRequest'
 */
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



 /**
 * @swagger
 * /forms/:id:
 *   delete:
 *     summary: admin이 선택한 form을 삭제한다. 
 *     tags: [Form]
 *     parameters: 
 *      - in: user
 *        name: id
 *        type: integer
 *        value: 1
 *        description: 로그인한 user가 admin인지 판단한다.
 *      - in: params
 *        name: id
 *        type: integer
 *        value: 2
 *        description: 삭제할 form의 id이다.
 *     responses:
 *      200: 
 *       description: 선택한 form을 삭제한후 true를 return한다.
 *       properties: 
 *        result:
 *          $ref: '#/definitions/Form'
 *      403: 
 *       $ref: '#/components/res/Forbidden'
 *      404: 
 *       $ref: '#/components/res/NotFound'
 *      500: 
 *       $ref: '#/components/res/BadRequest'
 */
router.delete('/:id', async (req: express.Request, res: express.Response) => {

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
