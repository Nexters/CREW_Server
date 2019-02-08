import Sequelize from "sequelize";
import { SequelizeAttributes } from "./index.d";
import { UserInstance, UserAttributes } from "./user";

export interface EvaluationAttributes {
  id?: number;
  score?: number;
  comment?: string;
  created_at?: Date;
  updated_at?: Date;
  user_id?: UserAttributes | UserAttributes['id'];
  user_admin_id?: UserAttributes | UserAttributes['id'];
}

export interface EvaluationInstance extends Sequelize.Instance<EvaluationAttributes>, EvaluationAttributes {
  getUser: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
  setUser: Sequelize.BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>
  createUser: Sequelize.BelongsToCreateAssociationMixin<UserAttributes, UserInstance>
};

export const EvaluationFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<EvaluationInstance, EvaluationAttributes>  => {
  const attributes: SequelizeAttributes<EvaluationAttributes> = {
    score: {
      type: DataTypes.INTEGER
    },
    comment: {
      type: DataTypes.STRING
    }
  };
  const Evaluation = sequelize.define<EvaluationInstance, EvaluationAttributes>('Evaluation', attributes);
  
  return Evaluation;
}