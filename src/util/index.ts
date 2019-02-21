import express from "express";
import { format } from "url";
import { PositionType, FormType } from "../models/form"

/*
 *  MODE in .env 
 *  PRODUCTION then STRICT ERROR
 *  DEV then LOOSE ERROR
 */


export interface FormJsonSkeleton {
    form: FormElementSkeleton[]

}

export interface FormElementSkeleton {
    position: PositionType;
    question_num: number;
    type: FormType;
    description: string,
    options: string,
}

export const CheckDataValidity = (elem): boolean => {

    if (!elem) {
        console.log("데이터가 존재하지 않습니다")
        return true;
    }

    for (let i = 0; i < elem.form.length; i++) {
        if (!(elem.form[i].description &&
            elem.form[i].position &&
            elem.form[i].question_num && elem.form[i].type)) {
            return true;
        }

        if(!getFormTypeAsEnum(elem.form[i].type)){
            return true;    
        }
    }
}

export const getFormTypeAsEnum = (refinedDate: FormElementSkeleton): FormType => {
    let type;
    switch (refinedDate.type) {
        case FormType.Long_Answer:
            type = FormType.Long_Answer;
            return type;
        case FormType.Short_Answer:
            type = FormType.Short_Answer;
            return type;
        case FormType.Selector:
            type = FormType.Selector;
            return type;
        case FormType.Upload:
            type = FormType.Upload;
            return type;
    };
    return null;
}

export const getPositionTypeAsEnum = (refinedDate: FormElementSkeleton): PositionType => {

    if (refinedDate.position == PositionType.Designer) {
        return PositionType.Designer;
    } else if (refinedDate.position == PositionType.Developer) {
        return PositionType.Developer;
    }
}

