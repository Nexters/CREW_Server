"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicantStatus;
(function (ApplicantStatus) {
    ApplicantStatus["Applicant"] = "applicant";
    ApplicantStatus["PaperPass"] = "paper_pass";
    ApplicantStatus["InterviewPass"] = "interview_pass";
    ApplicantStatus["Fail"] = "fail";
    ApplicantStatus["Admin"] = "admin";
})(ApplicantStatus || (ApplicantStatus = {}));
;
;
exports.UserFactory = (sequelize, DataTypes) => {
    const attributes = {
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
    const User = sequelize.define('User', attributes);
    return User;
};
//# sourceMappingURL=user.js.map