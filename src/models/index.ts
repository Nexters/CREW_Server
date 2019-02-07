import Sequelize from "sequelize";
import { DbInterface } from "../db/DbInterface/index";
import { UserFactory } from "./user";
import { FormFactory } from "./form";

export const createModels = (sequelizeConfig: any): DbInterface => {
  
  const { database, username, password, host, dialect } = sequelizeConfig;  
  const sequelize = new Sequelize(database, username, password, {host, dialect})
  const db: DbInterface = {
    sequelize,
    Sequelize,
    User: UserFactory(sequelize, Sequelize),
    Form: FormFactory(sequelize, Sequelize)
  };
  return db;
}