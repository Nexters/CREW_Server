import Sequelize from "sequelize";
import { SequelizeAttributes } from "./index.d";
import { ResumeInstance, ResumeAttributes } from "./resume";
import { EvaluationAttributes, EvaluationInstance } from "./evaluation";

enum ApplicantStatus {
  Applicant = "applicant",
  PaperPass = "paper_pass",
  InterviewPass= "interview_pass",
  Fail = "fail",
  Admin = "admin"
}

enum JobType {
  Student = "Student",
  Prepare = "Prepare",
  Worker = "Worker"
}

enum PositionType {
  Developer = "Developer",
  Designer = "Designer"
}

export interface UserAttributes {
  id?: number;
  name?: string;
  member_provider: string;
  member_provider_number: string;
  age?: number;
  phone_number?: string;
  email?: string;
  job?: JobType;
  position?: PositionType;
  provide_image?: string;
  status?: ApplicantStatus;
  token: string;
  created_at?: Date;
  updated_at?: Date;
  resumes?: ResumeAttributes[] | ResumeAttributes['id'][];
  evaluations?: EvaluationAttributes[] | EvaluationAttributes['id'][];
};


export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
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
  
  getEvaluation: Sequelize.HasOneGetAssociationMixin<EvaluationInstance>;
  setEvaluation: Sequelize.HasManySetAssociationsMixin<EvaluationInstance, EvaluationInstance['id']>;
  addEvaluation: Sequelize.HasManyAddAssociationMixin<EvaluationInstance, EvaluationInstance['id']>;
  addEvaluations: Sequelize.HasManyAddAssociationsMixin<EvaluationInstance, EvaluationInstance['id']>;
  createEvaluation: Sequelize.HasManyCreateAssociationMixin<EvaluationAttributes, EvaluationInstance>;
  removeEvaluation: Sequelize.HasManyRemoveAssociationMixin<EvaluationInstance, EvaluationInstance['id']>;
  removeEvaluations: Sequelize.HasManyRemoveAssociationsMixin<EvaluationInstance, EvaluationInstance['id']>;
  hasEvaluation: Sequelize.HasManyHasAssociationMixin<EvaluationInstance, EvaluationInstance['id']>;
  hasEvaluations: Sequelize.HasManyHasAssociationsMixin<EvaluationInstance, EvaluationInstance['id']>;
  countEvaluations: Sequelize.HasManyCountAssociationsMixin;
};

export const UserFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UserInstance,UserAttributes> => {
  const attributes: SequelizeAttributes<UserAttributes> = {
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
    job: {
      type: DataTypes.ENUM(JobType.Student, JobType.Prepare, JobType.Worker)
    },
    position: {
      type: DataTypes.ENUM(PositionType.Developer, PositionType.Designer)
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
    User.hasMany(models.Evaluation, {foreignKey: 'user_id'});
    User.hasMany(models.Evaluation, {foreignKey: 'user_admin_id'});
  }
  return User;
};
