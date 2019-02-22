"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
exports.ResumeFactory = (sequelize, DataTypes) => {
    const attributes = {
        answer: {
            type: DataTypes.STRING
        }
    };
    const Resume = sequelize.define('Resume', attributes);
    return Resume;
};
//# sourceMappingURL=resume.js.map