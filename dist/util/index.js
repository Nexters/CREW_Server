"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const form_1 = require("../models/form");
exports.CheckDataValidity = (elem) => {
    if (!elem) {
        console.log("데이터가 존재하지 않습니다");
        return true;
    }
    for (let i = 0; i < elem.form.length; i++) {
        if (!(elem.form[i].description &&
            elem.form[i].position &&
            elem.form[i].question_num && elem.form[i].type)) {
            return true;
        }
        if (!exports.getFormTypeAsEnum(elem.form[i].type)) {
            return true;
        }
    }
};
exports.getFormTypeAsEnum = (refinedDate) => {
    let type;
    switch (refinedDate.type) {
        case form_1.FormType.Long_Answer:
            type = form_1.FormType.Long_Answer;
            return type;
        case form_1.FormType.Short_Answer:
            type = form_1.FormType.Short_Answer;
            return type;
        case form_1.FormType.Selector:
            type = form_1.FormType.Selector;
            return type;
        case form_1.FormType.Upload:
            type = form_1.FormType.Upload;
            return type;
    }
    ;
    return null;
};
exports.getPositionTypeAsEnum = (refinedDate) => {
    if (refinedDate.position == form_1.PositionType.Designer) {
        return form_1.PositionType.Designer;
    }
    else if (refinedDate.position == form_1.PositionType.Developer) {
        return form_1.PositionType.Developer;
    }
};
//# sourceMappingURL=index.js.map