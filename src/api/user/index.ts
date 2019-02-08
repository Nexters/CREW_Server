import express from "express";
import { db } from "../../app";
import { ResumeInstance } from "../../models/resume";

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  const user = await db.User.find({where: {id}});
  res.send(user);
});

export default router;