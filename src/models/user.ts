import Sequelize from "sequelize";
import { SequelizeAttributes } from "./index.d";
import { ResumeInstance, ResumeAttributes } from "./resume";

enum ApplicantStatus {
  Applicant = "applicant",
  PaperPass = "paper_pass",
  InterviewPass= "interview_pass",
  Fail = "fail",
  Admin = "admin"
}

export interface UserAttributes {
  id: number;
  name?: string;
  member_provider: string;
  member_provider_number: string;
  age?: number;
  phone_number?: string;
  email?: string;
  provide_image?: string;
  status?: ApplicantStatus;
  token: string;
  created_at?: Date;
  updated_at?: Date;
};


export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
  getResume: Sequelize.HasManyGetAssociationsMixin<ResumeInstance>;
  setResume: Sequelize.HasManySetAssociationsMixin<ResumeInstance, ResumeInstance['id']>;
  addResume: Sequelize.HasManyAddAssociationMixin<ResumeInstance, ResumeInstance['id']>;
  createResume: Sequelize.HasManyCreateAssociationMixin<ResumeAttributes, ResumeInstance>;
  removeResume: Sequelize.HasManyRemoveAssociationMixin<ResumeInstance, ResumeInstance['id']>;
  hasResume: Sequelize.HasManyHasAssociationMixin<ResumeInstance, ResumeInstance['id']>;
};

export const UserFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UserInstance,UserAttributes> => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    member_provider: {
      type: DataTypes.STRING
    },
    member_provider_number: {
      type: DataTypes.STRING
    },
    age: {
      type: DataTypes.INTEGER
    },
    phone_number: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    provide_image: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM(ApplicantStatus.Applicant, ApplicantStatus.PaperPass, ApplicantStatus.InterviewPass, ApplicantStatus.Fail, ApplicantStatus.Admin)
    },
    token: {
      type: DataTypes.STRING
    }
  };
  const User = sequelize.define<UserInstance,UserAttributes>('User', attributes);

  User.associate = models => {
    User.hasMany(models.Resume, {foreignKey: 'user_id'});
  }
  return User;
};