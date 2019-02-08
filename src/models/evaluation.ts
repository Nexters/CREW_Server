import Sequelize from "sequelize";
import { SequelizeAttributes } from "./index.d";

export interface EvaluationAttributes {
  id?: number;
  score?: number;
  comment?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface EvaluationInstance extends Sequelize.Instance<EvaluationAttributes>, EvaluationAttributes {

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