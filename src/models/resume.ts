import Sequelize from "sequelize";
import { SequelizeAttributes } from "./index.d";
import { UserInstance, UserAttributes } from "./user";
import { FormInstance, FormAttributes } from "./form";

export interface ResumeAttributes {
  id?: number;
  answer?: string;
  created_at?: Date;
  updated_at?: Date;
}


export interface ResumeInstance extends Sequelize.Instance<ResumeAttributes>, ResumeAttributes {
  getUser: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
  setUser: Sequelize.BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>;
  createUser: Sequelize.BelongsToCreateAssociationMixin<UserAttributes, UserInstance>;

  getForm: Sequelize.BelongsToGetAssociationMixin<FormInstance>;
  setForm: Sequelize.BelongsToSetAssociationMixin<FormInstance, FormInstance['id']>;
  createForm: Sequelize.BelongsToCreateAssociationMixin<FormAttributes, FormInstance>;
};

export const ResumeFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<ResumeInstance, ResumeAttributes> => {
  const attributes: SequelizeAttributes<ResumeAttributes> = {
    answer: {
      type: DataTypes.STRING
    }
  };
  const Resume = sequelize.define<ResumeInstance, ResumeAttributes>('Resume', attributes);
    
  return Resume;
};