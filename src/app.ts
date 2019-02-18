import dotenv from "dotenv";
dotenv.config();

import express from "express";
import user from "./api/user/index";
import auth from "./api/auth/index";
import resume from "./api/resume/index";
import evaluation from "./api/evaluation/index";
import form from "./api/form/index";
import { createModels } from "./models/index";

import  AppResultClass from "./util/index"


const env = process.env.NODE_ENV || 'development';
const config = require("./config/config")[env];

config.freezeTableName = true;
const app = express();
export const db = createModels(config);

app.use('/user', user);
app.use('/auth', auth);
app.use('/resumes', resume);
app.use('/evaluation',evaluation);
app.use('/form',form);
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




