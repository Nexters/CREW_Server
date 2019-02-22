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
const index_1 = require("./util/index");
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
function updateUserInfo({ id, age, name, phone_number, email, job, position }) {
    return __awaiter(this, void 0, void 0, function* () {
        const updated_user = yield app_1.db.User.update({
            age: age,
            name: name,
            phone_number: phone_number,
            email: email,
            job: job,
            position: position
        }, { where: { id } });
        return updated_user;
    });
}
exports.updateUserInfo = updateUserInfo;
function getEvaluationByUserId({ user_id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const evaluation = yield app_1.db.Evaluation.findAll({
            where: {
                user_id: user_id,
            }
        });
        if (!evaluation) {
            return null;
        }
        return evaluation;
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
                user_admin_id,
                user_id,
            }
        });
        if (!isExist) {
            let newEvaluation;
            try {
                newEvaluation = yield app_1.db.Evaluation.create({
                    user_admin_id: user_admin_id,
                    user_id: user_id,
                    score: score,
                    comment: comment
                });
            }
            catch (err) {
                return false;
            }
            if (!newEvaluation) {
                return null;
            }
            return newEvaluation;
        }
        const updateEvaluation = yield app_1.db.Evaluation.update({
            score: score,
            comment: comment
        }, {
            where: {
                user_admin_id: user_admin_id,
                user_id: user_id
            }
        });
        if (!updateEvaluation) {
            return null;
        }
        return updateEvaluation;
    });
}
exports.upsertEvaluationByUserId = upsertEvaluationByUserId;
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
function findFormById({ form_id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const form = yield app_1.db.Form.findByPk(form_id);
        if (!form) {
            return null;
        }
        return form;
    });
}
exports.findFormById = findFormById;
function updateORcreateResume({ answer, form_id, user_id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExist = yield app_1.db.Resume.findOne({
            where: {
                form_id: form_id,
                user_id: user_id
            }
        });
        if (isExist) {
            const updateResume = yield app_1.db.Resume.update({
                answer
            }, {
                where: {
                    form_id: form_id,
                    user_id: user_id
                }
            });
            return updateResume;
        }
        const createResume = yield app_1.db.Resume.create({
            answer,
            form_id,
            user_id
        });
        return createResume;
    });
}
exports.updateORcreateResume = updateORcreateResume;
function findAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield app_1.db.User.findAll();
        if (!users) {
            return null;
        }
        return users;
    });
}
exports.findAllUsers = findAllUsers;
function getForm({ position }) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbResult = yield app_1.db.Form.findAll({
            where: {
                position: position
            }
        });
        if (!dbResult) {
            return null;
        }
        return dbResult;
    });
}
exports.getForm = getForm;
function upsertForm(data) {
    return __awaiter(this, void 0, void 0, function* () {
        let refinedData = data.form;
        let sFlag = true; // 모든 create/update 가 성공했는지 저장한다
        let fIdx = 0; // 몇 번 째 시도에서 실패했는지 저장한다
        let dbResult, question_num, description, rawOptions, options, position, type;
        for (let i = 0; i < refinedData.length; i++) {
            position = index_1.getPositionTypeAsEnum(refinedData[i]);
            type = index_1.getFormTypeAsEnum(refinedData[i]);
            question_num = refinedData[i].question_num,
                description = refinedData[i].description;
            rawOptions = refinedData[i].options;
            options = JSON.stringify(rawOptions);
            let isFormExist = yield app_1.db.Form.findOne({ where: { question_num: question_num, position: position } });
            if (!isFormExist) {
                dbResult = yield Promise.all([app_1.db.Form.create({
                        position,
                        question_num,
                        description,
                        options,
                        type
                    })
                ]);
            }
            else {
                dbResult = yield Promise.all([app_1.db.Form.update({
                        position,
                        question_num,
                        description,
                        options,
                        type
                    }, {
                        where: {
                            question_num: question_num,
                            position: position
                        }
                    })
                ]);
            }
            if (!dbResult) {
                sFlag = false;
                fIdx = i;
            }
        }
        if (!sFlag) {
            return false;
        }
        return refinedData;
    });
}
exports.upsertForm = upsertForm;
function deleteFormItem({ form_id }) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        result = yield app_1.db.Form.destroy({ where: { id: form_id } });
        if (!result) {
            return false;
        }
        return true;
    });
}
exports.deleteFormItem = deleteFormItem;
//# sourceMappingURL=query.js.map