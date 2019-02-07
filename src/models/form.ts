import Sequelize from "sequelize"
import { SequelizeAttributes } from "./index.d";

enum FormType {
  Short_Answer = "Short_Answer",
  Long_Answer = "Long_Answer",
  Selector = "Seletor",
  Upload = "Upload"
}

enum JobType {
  Developer = "Developer",
  Designer = "Designer"
}

export interface FormAttributes {
  id?: number;
  job: JobType;
  question_num: number;
  description?: string;
  type: FormType;
  created_at?: Date;
  updated_at?: Date;
}

export interface FormInstance extends Sequelize.Instance<FormAttributes>, FormAttributes {
 
};

export const FormFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<FormInstance, FormAttributes> => {
  const attributes: SequelizeAttributes<FormAttributes> = {
    job: {
      type: DataTypes.ENUM(JobType.Developer, JobType.Designer)
    },
    question_num: {
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING
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