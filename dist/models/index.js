"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const user_1 = require("./user");
const form_1 = require("./form");
const resume_1 = require("./resume");
const evaluation_1 = require("./evaluation");
exports.createModels = (sequelizeConfig) => {
    const { database, username, password, host, dialect, define } = sequelizeConfig;
    const sequelize = new sequelize_1.default(database, username, password, { host, dialect, define });
    const db = {
        sequelize,
        Sequelize: sequelize_1.default,
        User: user_1.UserFactory(sequelize, sequelize_1.default),
        Form: form_1.FormFactory(sequelize, sequelize_1.default),
        Resume: resume_1.ResumeFactory(sequelize, sequelize_1.default),
        Evaluation: evaluation_1.EvaluationFactory(sequelize, sequelize_1.default)
    };
    Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
    return db;
};
//# sourceMappingURL=index.js.map