"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FormType;
(function (FormType) {
    FormType["Short_Answer"] = "Short_Answer";
    FormType["Long_Answer"] = "Long_Answer";
    FormType["Selector"] = "Seletor";
    FormType["Upload"] = "Upload";
})(FormType || (FormType = {}));
var PositionType;
(function (PositionType) {
    PositionType["Developer"] = "Developer";
    PositionType["Designer"] = "Designer";
})(PositionType || (PositionType = {}));
;
exports.FormFactory = (sequelize, DataTypes) => {
    const attributes = {
        position: {
            type: DataTypes.ENUM(PositionType.Developer, PositionType.Designer)
        },
        question_num: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.ENUM(FormType.Short_Answer, FormType.Long_Answer, FormType.Selector, FormType.Upload)
        }
    };
    const Form = sequelize.define('Form', attributes);
    Form.associate = models => {
        Form.hasMany(models.Resume, { foreignKey: 'form_id' });
    };
    return Form;
};
//# sourceMappingURL=form.js.map