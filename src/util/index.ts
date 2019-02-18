import express from "express";
import { format } from "url";
import {PositionType, FormType} from "../models/form"

/*
 *  MODE in .env 
 *  PRODUCTION then STRICT ERROR
 *  DEV then LOOSE ERROR
 */


export default class AppResult {

    mode: string;
    status: number;
    result: any;
    where: string;
    message: string;


    constructor(result: any = null, status: number, where: string, message: string) {
        this.status = status;
        this.result = result;
        this.where = where;
        this.message = message;
        this.mode = process.env.MODE;
    }
    public isError() : boolean {
        if(!this.getResult()){
            return true;
        }
        return false;
    }
    public getStatus(): number {
        return this.status;
    }
    public getResult(): any {
        return this.result;
    }
    public getWhere(): string {
        return this.where;
    }
    public getMessage(): string {
        return this.message;
    }
    public setResult(result: any): void {
        this.result = result;
    }
    public setMessage(message: string) {
        this.message = message;
    }
    public Error(): string {
        if (this.mode == "DEV") {
            let error = "at < " + this.getWhere() + " > : < " + this.getMessage() + " >";
            console.log(error);
            return error;
        } else {
            return this.getMessage();
        }
    }
    public Excute(res: express.Response) {
        if (!this.result && this.getStatus() != 200) {
            res.status(this.getStatus()).send(this.Error())
        } else if (this.result) {
            res.status(this.getStatus()).send(this.getResult());
        } else {
            res.status(504).send("at < util/index > : < server_made_wrong_result > ")
        }
    }
}


export interface  FormJsonSkeleton{
    form : FormElementSkeleton[]

}

export interface FormElementSkeleton {
    position : PositionType;
    question_num : number;
    type : FormType;
    description : string,
    options : string,
}

export const CheckDataValidity = (elem) : boolean => {
    
    
    for(let i=0; i < elem.form.length; i++){
        if(!(elem.form[i].description &&
             elem.form[i].position &&
              elem.form[i].question_num && elem.form[i].type)){
                return true;
    }
    

}
}

export const getFormTypeAsEnum = (refinedDate : FormElementSkeleton)  : FormType => {
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
}

export const getPositionTypeAsEnum = (refinedDate : FormElementSkeleton) : PositionType => {

    if (refinedDate.position == PositionType.Designer) {
        return  PositionType.Designer;
      } else if(refinedDate.position==PositionType.Developer){
        return  PositionType.Developer;
      }
}

export const buildDescription = (rawDescription) : string => {
    let description = rawDescription[0];
    if (rawDescription.length > 1) {
      description += "[opt>]";
      for (let j = 1; j < rawDescription.length; j++) {
        description += ":" + rawDescription[j];
      }
    }
    return description;
}