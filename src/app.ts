import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import swaggerUI from "swagger-ui-express";

import user from "./api/user/index";
import auth from "./api/auth/index";
import mail from "./api/mail/index";
import resume from "./api/resume/index";
import evaluation from "./api/evaluation/index";
import form from "./api/form/index";
import { createModels } from "./models/index";
import { swaggerSpec } from "./swagger";

const env = process.env.NODE_ENV || 'development';
const config = require("./config/config")[env];
const port = process.env.PORT || 3000;
config.freezeTableName = true;
const app = express();
export const db = createModels(config);



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', user);
app.use('/auth', auth);
app.use('/mail', mail);
app.use('/resumes', resume);
app.use('/evaluations',evaluation);
app.use('/forms',form);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


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
    app.listen({port}, () => {
      console.log(`${port} Sever Start`);
      console.log()
    });
  })




