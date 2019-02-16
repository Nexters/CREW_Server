import express from "express";

/*
 *  MODE in .env 
 *  PRODUCTION then STRICT ERROR
 *  DEV then LOOSE ERROR
 */

 
export default class AppResult { 
    
    mode  : string;    
    status : number; 
    result : any;
    where :  string;
    message : string;


    constructor(result : any = null  , status : number , where : string, message : string){
        this.status = status;
        this.result = result;
        this.where = where;
        this.message = message;
        this.mode = process.env.MODE;
    }

    public getStatus() : number  {
        return this.status; 
    }
    public getResult() : void {
        return this.result; 
    }
    public getWhere() : string {
        return this.where; 
    }
    public getMessage() : string {
        return this.message; 
    }
    public setResult(result : any) : void {
        this.result = result; 
    }
    public setMessage(message : string ){
        this.message = message;
    }
    public Error() : string {
        if(this.mode=="DEV"){
            let error = "at < "+this.getWhere()+" > : < "+this.getMessage()+" >";
            console.log(error);
            return error;
        }else{
            return this.getMessage();     
        }
    }
    public Excute(res : express.Response){
        if(!this.result && this.getStatus() != 200){
            res.status(this.getStatus()).send(this.Error())
        }else if(this.result){
            res.status(this.getStatus()).end(); 
        }else{
            res.status(504).send("at < util/index > : < server_made_wrong_result > ")
        }
    
    
}
