import express from "express";
import * as query from "../../query";
import * as mw from "../../middleware";
import { UserInstance } from "../../models/user";

const router = express.Router();

router.use(mw.jsonMiddleware);
router.use(mw.urlencodedMiddleware);
router.use(mw.expressJwt);
router.use(mw.corsMiddleware);
router.use('*', mw.corsMiddleware);


 /**
 * @swagger
 * /users/:
 *   get:
 *     summary: 사용자 정보 가져오기
 *     tags: [User]
 *     parameters: 
 *      - in: user
 *        name: id
 *        type: integer
 *        description: 접속한 user id로 admin 여부 판단.
 *     responses: 
 *      200: 
 *       description: admin 일 경우 users [user array] OR 자신의 user 값반환 
 *       type: array
 *       properties: 
 *        users:
 *         items: 
 *          $ref: '#/definitions/User'
 *      403: 
 *       $ref: '#/components/res/Forbidden'
 *      404: 
 *       $ref: '#/components/res/NotFound'
 *      500: 
 *       $ref: '#/components/res/BadRequest'
 */
router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const id = req.user.id;
    const admin = await query.findUserAdmin({ id: id });
    if (!admin) {
      const user = await query.findUserById({ id });
      if(!user) { return res.status(404).end('get users/ : not admin and not found user');}
      res.send(user);
    }
    const users: UserInstance[] = await query.findAllUsers();
    if(!users) { return res.status(404).end(`get users/ : admin but not found user list`);}
    res.send(users);
  } catch (err) {
    return res.status(404).end(`get users: ${err}`);
  }
});

/**
 * @swagger
 * /users/:id:
 *   get:
 *     summary: id에 해당하는 사용자 정보 가져오기
 *     tags: [User]
 *     parameters: 
 *      - in: params
 *        name: id
 *        type: integer
 *        description: id에 해당하는 사용자 정보 가져오기.
 *     responses: 
 *      200: 
 *       description: id에 해당하는 user정보 가져오기.
 *       schema: 
 *        properties: 
 *         user:
 *          $ref: '#/definitions/User'
 *      403: 
 *       $ref: '#/components/res/Forbidden'
 *      404: 
 *       $ref: '#/components/res/NotFound'
 *      500: 
 *       $ref: '#/components/res/BadRequest'
 */
router.get('/:id', async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  try {
    const user = await query.findUserById({ id });  
    if(!user) { return res.status(404).end('get users/:id : not found user');}
    res.send(user);
  } catch (err) {
    return res.status(404).end(`get users/:id : ${err}`);
  }
  
  
});

/**
 * @swagger
 * /users/:
 *   put:
 *     summary: id에 해당하는 사용자 정보 update하기.
 *     tags: [User]
 *     parameters: 
 *      - in: params
 *        name: id
 *        type: integer
 *        description: id에 해당하는 사용자 정보 가져와서 업데이트하기.
 *      - in: body
 *        name: name
 *        type: string
 *        description: 이름
 *      - in: body
 *        name: age
 *        type: integer
 *        description: 나이
 *      - in: body
 *        name: phone_number
 *        type: string
 *        description: 연락처
 *      - in: body
 *        name: email
 *        type: string
 *        description: 이메일
 *      - in: body
 *        name: job
 *        type: JobType
 *        enum: [Student, Prepare, Worker]
 *        description: 직업
 *      - in: body
 *        name: position
 *        type: PositionType
 *        enum: [Developer, Designer]
 *        description: 지원직무
 *     responses: 
 *      200: 
 *       description: id에 해당하는 user정보 가져오기.
 *       type: object
 *       properties: 
 *        updated_user:
 *         items: 
 *          $ref: '#/definitions/User'
 *      403: 
 *       $ref: '#/components/res/Forbidden'
 *      404: 
 *       $ref: '#/components/res/NotFound'
 *      500: 
 *       $ref: '#/components/res/BadRequest'
 */

router.put("/", async (req: express.Request, res: express.Response) => {
  try {
    const id = req.user.id;
    const name = req.body.name;
    const age = req.body.age;
    const phone_number = req.body.phone_number;
    const email = req.body.email;
    const job = req.body.job;
    const position = req.body.position;

    const updated_user = await query.updateUserInfo({ id, name, age, phone_number, email, job, position });
    if(!updated_user) { return res.status(404).end(`put users/ : not found updated_user`);}
    res.send(updated_user);
  } catch (err) {
    return res.status(500).send(`put users/ : ${err}`); // err : user 정보 업데이트 실패
  }
});

export default router;