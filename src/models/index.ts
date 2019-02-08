import Sequelize from "sequelize";
import { DbInterface } from "../db/DbInterface/index";
import { UserFactory } from "./user";
import { FormFactory } from "./form";
import { ResumeFactory } from "./resume";

export const createModels = (sequelizeConfig: any): DbInterface => {
  
  const { database, username, password, host, dialect, define } = sequelizeConfig;  
  const sequelize = new Sequelize(database, username, password, {host, dialect, define})
  const db: DbInterface = {
    sequelize,
    Sequelize,
    User: UserFactory(sequelize, Sequelize),
    Form: FormFactory(sequelize, Sequelize),
    Resume: ResumeFactory(sequelize, Sequelize)
  };

  Object.keys(db).forEach(modelName => {
    if(db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  return db;
}