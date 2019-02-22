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