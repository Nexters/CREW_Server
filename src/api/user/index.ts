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
    const admin_id = req.user.id;
    const admin = await query.findUserAdmin({ id : admin_id });
    if (!admin) {
      const user  = await query.findUserById({ id : admin_id });
      res.send(user);
    }
    const users: UserInstance[] = await query.findAllUsers();

    res.send(users);
  } catch (error) {
    return res.status(404).send();
  }
});

router.get('/:id', async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  const user = await query.findUserById({ id });
  res.send(user);
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
    res.send(updated_user);
  } catch (err) {
    return res.status(500).send(err); // err : user 정보 업데이트 실패
  }
});

export default router;