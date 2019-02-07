import * as Sequelize from "sequelize";
import { UserAttributes, UserInstance} from "../../models/user";
import { FormAttributes, FormInstance } from "../../models/form";


export interface DbInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  User: Sequelize.Model<UserInstance,UserAttributes>;
  Form: Sequelize.Model<FormInstance, FormAttributes>;
}
