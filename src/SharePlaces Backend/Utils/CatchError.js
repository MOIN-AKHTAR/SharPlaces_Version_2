const httpError=require("./httpError");
exports.catchError=(next)=>{
    const err=new httpError("Something gone wrong",500);
    next(err);
}