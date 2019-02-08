"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
module.exports = {
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "dialect": process.env.DB_Dialect,
        "define": {
            freezeTableName: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    },
    "test": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "dialect": process.env.DB_Dialect,
        "define": {
            freezeTableName: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    },
    "production": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "dialect": process.env.DB_Dialect,
        "define": {
            freezeTableName: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
};
//# sourceMappingURL=config.js.map