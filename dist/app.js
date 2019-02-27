"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const index_1 = __importDefault(require("./api/user/index"));
const index_2 = __importDefault(require("./api/auth/index"));
const index_3 = __importDefault(require("./api/mail/index"));
const index_4 = __importDefault(require("./api/resume/index"));
const index_5 = __importDefault(require("./api/evaluation/index"));
const index_6 = __importDefault(require("./api/form/index"));
const index_7 = require("./models/index");
const swagger_1 = require("./swagger");
const env = process.env.NODE_ENV || 'development';
const config = require("./config/config")[env];
const port = process.env.PORT || 3000;
config.freezeTableName = true;
const app = express_1.default();
exports.db = index_7.createModels(config);
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use('/users', index_1.default);
app.use('/auth', index_2.default);
app.use('/mail', index_3.default);
app.use('/resumes', index_4.default);
app.use('/evaluations', index_5.default);
app.use('/forms', index_6.default);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
app.set('view engine', 'pug');
app.get('/', (req, res) => {
    res.send('success router');
});
const options = {
    force: process.env.NODE_ENV === 'test' ? true : false
};
exports.db.sequelize.sync(options)
    .then(() => {
    console.log('Sequelize Sync Success');
    app.listen({ port }, () => {
        console.log(`${port} Sever Start`);
        console.log();
    });
});
//# sourceMappingURL=app.js.map