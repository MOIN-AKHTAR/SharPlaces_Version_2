const httpError=require("../Utils/httpError");
const JWT=require("jsonwebtoken");

const AuthMiddleWare=(req,res,next)=>{
    try {
        const token=req.headers.authorization.split(" ")[1];
        if(!token){
             const error=new httpError("Authentication Failed",401);
             return next(error);
        }else{
         const decodedToken=JWT.verify(token,"TANISHTIMIZAMEMNUNOLDUM");
         req.userData = { userId: decodedToken.userId };
         next();
        }
    } catch (err) {
        const error=new httpError("Authentication Failed",401);
             return next(error);
    }
}

module.exports=AuthMiddleWare;