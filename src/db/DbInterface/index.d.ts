import * as Sequelize from "sequelize";
import { UserAttributes, UserInstance} from "../../models/user";


export interface DbInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  User: Sequelize.Model<UserInstance,UserAttributes>;
}
