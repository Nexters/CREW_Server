import express from "express";
import * as query from "../../query";

const router = express.Router();

router.get('/:id', async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  const user = await query.findUserById({id});
  res.send(user);
});

export default router;