import express from "express";
import user from "./api/user/index";
import auth from "./api/auth/index";
import { createModels } from "./models/index";

const env = process.env.NODE_ENV || 'development';
const config = require("./config/config")[env];
export const db = createModels(config);
const app = express();

app.use('/user', user);
app.use('/auth', auth);

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('success router');
});

const options = {
  force: process.env.NODE_ENV === 'test' ? true : false
}

db.sequelize.sync(options)
  .then(() => {
    console.log('Sequelize Sync Success')
    app.listen(3000, () => {
      console.log('Sever Start');
      console.log()
    });
  })




