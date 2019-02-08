import express from "express";
import { db } from "../../app";

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  const user = await db.User.findById(1)
  res.send(user.created_at);
});

export default router;