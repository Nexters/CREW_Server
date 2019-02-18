import Sequelize, { json } from "sequelize"
import { SequelizeAttributes } from "./index.d";
import { ResumeInstance, ResumeAttributes } from "./resume";

export enum FormType {
  Short_Answer = "Short_Answer",
  Long_Answer = "Long_Answer",
  Selector = "Seletor",
  Upload = "Upload"
}

export enum PositionType {
  Developer = "Developer",
  Designer = "Designer"
}

export interface options { 
  optionPlaceholder : string,
  checked : boolean
}

export interface FormAttributes {
  id?: number;
  position: PositionType;
  question_num: number;
  description?: string;
  options? :  json;
  type: FormType;
  created_at?: Date;
  updated_at?: Date;
  resumes?: ResumeAttributes[] | ResumeAttributes['id'][];
}

export interface FormInstance extends Sequelize.Instance<FormAttributes>, FormAttributes {
  getResume: Sequelize.HasManyGetAssociationsMixin<ResumeInstance>;
  setResume: Sequelize.HasManySetAssociationsMixin<ResumeInstance, ResumeInstance['id']>;
  addResume: Sequelize.HasManyAddAssociationMixin<ResumeInstance, ResumeInstance['id']>;
  addResumes: Sequelize.HasManyAddAssociationsMixin<ResumeInstance, ResumeInstance['id']>;
  createResume: Sequelize.HasManyCreateAssociationMixin<ResumeAttributes, ResumeInstance>;
  removeResume: Sequelize.HasManyRemoveAssociationMixin<ResumeInstance, ResumeInstance['id']>;
  removeResumes: Sequelize.HasManyRemoveAssociationsMixin<ResumeInstance, ResumeInstance['id']>;
  hasResume: Sequelize.HasManyHasAssociationMixin<ResumeInstance, ResumeInstance['id']>;
  hasResumes: Sequelize.HasManyHasAssociationsMixin<ResumeInstance, ResumeInstance['id']>;
  countResumes: Sequelize.HasManyCountAssociationsMixin;
};

export const FormFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<FormInstance, FormAttributes> => {
  const attributes: SequelizeAttributes<FormAttributes> = {
    position: {
      type: DataTypes.ENUM(PositionType.Developer, PositionType.Designer)
    },
    question_num: {
      type: DataTypes.INTEGER
    },
    description :{
      type : DataTypes.STRING
    },
    options : {
      type : DataTypes.JSON
    },
    type: {
      type: DataTypes.ENUM(FormType.Short_Answer, FormType.Long_Answer, FormType.Selector, FormType.Upload)
    }
  };
  const Form = sequelize.define<FormInstance, FormAttributes>('Form', attributes);
  Form.associate = models => {
    Form.hasMany(models.Resume, {foreignKey: 'form_id'});
  }
  return Form;
};