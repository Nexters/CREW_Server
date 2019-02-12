import express from "express";
import bodyParser from "body-parser";

import user from "./api/user/index";
import auth from "./api/auth/index";
import mail from "./api/mail/index";

import { createModels } from "./models/index";

const env = process.env.NODE_ENV || 'development';
const config = require("./config/config")[env];
config.freezeTableName = true;
const app = express();
export const db = createModels(config);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', user);
app.use('/auth', auth);
app.use('/mail', mail);
app.set('view engine', 'pug')

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




