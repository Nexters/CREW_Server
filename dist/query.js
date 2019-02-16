"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
function findUserById({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield app_1.db.User.findByPk(id);
        if (!user) {
            return null;
        }
        return user;
    });
}
exports.findUserById = findUserById;
;
function findUserByProvider({ member_provider, member_provider_number }) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield app_1.db.User.find({ where: { member_provider, member_provider_number } });
        if (!user) {
            return null;
        }
        return user;
    });
}
exports.findUserByProvider = findUserByProvider;
function createUser({ member_provider, member_provider_number, provide_image, token }) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = yield app_1.db.User.create({
            member_provider,
            member_provider_number,
            provide_image,
            token
        });
        if (!newUser) {
            return null;
        }
        return newUser;
    });
}
exports.createUser = createUser;
function findResumesByUserId({ user_id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const resumes = yield app_1.db.Resume.findAll({ where: { user_id } });
        if (!resumes) {
            return null;
        }
        return resumes;
    });
}
exports.findResumesByUserId = findResumesByUserId;
function findUserAdmin({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const admin = yield app_1.db.User.find({ where: { id, status: 'admin' } });
        if (!admin) {
            return null;
        }
        return admin;
    });
}
exports.findUserAdmin = findUserAdmin;
//# sourceMappingURL=query.js.map