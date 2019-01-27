"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
exports.UserFactory = (sequelize, DataTypes) => {
    const attributes = {
        name: {
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
            type: DataTypes.ENUM('applicant', 'paper_pass', 'interview_pass', 'fail', 'admin')
        },
        token: {
            type: DataTypes.STRING
        }
    };
    const User = sequelize.define('User', attributes);
    return User;
};
//# sourceMappingURL=user.js.map