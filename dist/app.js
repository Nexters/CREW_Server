"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./api/user/index"));
const index_2 = require("./models/index");
const env = process.env.NODE_ENV || 'development';
const config = require("./config/config")[env];
// config.dialect = 'mysql';
const db = index_2.createModels(config);
const app = express_1.default();
app.use('/user', index_1.default);
app.get('/', (req, res) => {
    res.send('success router');
});
const options = {
    force: process.env.NODE_ENV === 'test' ? true : false
};
db.sequelize.sync(options)
    .then(() => {
    console.log('Sequelize Sync Success');
    app.listen(3000, () => {
        console.log('Sever Start');
        console.log();
    });
});
//# sourceMappingURL=app.js.map