"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
exports.EvaluationFactory = (sequelize, DataTypes) => {
    const attributes = {
        score: {
            type: DataTypes.INTEGER
        },
        comment: {
            type: DataTypes.STRING
        }
    };
    const Evaluation = sequelize.define('Evaluation', attributes);
    return Evaluation;
};
//# sourceMappingURL=evaluation.js.map