"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const user_1 = require("./user");
exports.createModels = (sequelizeConfig) => {
    const { database, username, password, host, dialect } = sequelizeConfig;
    const sequelize = new sequelize_1.default(database, username, password, { host, dialect });
    const db = {
        sequelize,
        Sequelize: sequelize_1.default,
        User: user_1.UserFactory(sequelize, sequelize_1.default)
    };
    return db;
};
//# sourceMappingURL=index.js.map