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
function getEvaluationByUserId({ user_id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const evaluation = yield app_1.db.Evaluation.findAll({
            where: {
                user_id: user_id,
            }
        });
        for (let i = 0; i < evaluation.length; i++) {
            console.log("Evaluation[" + i + "] :" + evaluation[i]);
        }
        console.log(JSON.stringify(evaluation[0]));
    });
}
exports.getEvaluationByUserId = getEvaluationByUserId;
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
function upsertEvaluationByUserId({ user_admin_id, user_id, score, comment }) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExist = yield app_1.db.Evaluation.findOne({
            where: {
                user_admin_id: user_admin_id,
                user_id: user_id,
            }
        });
        if (!isExist) {
            console.log("새로운 Evaluation 생성");
            const newEvaluation = yield app_1.db.Evaluation.create({
                user_admin_id,
                user_id,
                score,
                comment
            });
            if (!newEvaluation) {
                return null; // return 
            }
            return newEvaluation; // return 
        }
        const updateEvaluation = yield app_1.db.Evaluation.update({
            score,
            comment
        }, {
            where: {
                user_admin_id,
                user_id: user_id
            }
        });
        // return  when update is fail 
        return updateEvaluation;
    });
}
exports.upsertEvaluationByUserId = upsertEvaluationByUserId;
//# sourceMappingURL=query.js.map