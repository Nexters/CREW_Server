import Sequelize from "sequelize";
import { SequelizeAttributes } from "./index.d";

export interface UserAttributes {
  id?: number;
  name: string;
  member_provider: string;
  member_provider_number: number;
  age: number;
  phone_number: string;
  email: string;
  provide_image: string;
  status: 'applicant' | 'paper_pass' | 'interview_pass' | 'fail' | 'admin';
  token: string;
  created_at?: Date;
  updated_at?: Date;
};


export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
  // Sequelize Instance Method가 추가된다.
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
      type: DataTypes.INTEGER
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
      type: DataTypes.ENUM('applicant','paper_pass','interview_pass','fail','admin')
    },
    token: {
      type: DataTypes.STRING
    }
  };
  const User = sequelize.define<UserInstance,UserAttributes>('User', attributes);
  return User;
};