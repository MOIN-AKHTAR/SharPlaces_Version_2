const User=require("../Models/UserSchema");
const httpError=require("../Utils/httpError");
const {catchError}=require("../Utils/CatchError");
const {validationResult}=require("express-validator");

exports.signUp=async (req,res,next)=>{
       try {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return next(
                new httpError('Invalid inputs passed, please check your data.', 422)
              );
        }
           let existingUser=await User.findOne({email:req.body.email});
           if(existingUser){
               let error=new httpError("Already have user with this email",400);
               return next(error);
           }

           const {name,email,password}=req.body;
           let user=new User({
               name,
               email,
               password,
               image:req.file?req.file.path:"/Public/Images/noImage.jpg"
           });
           const newUser=await user.save();
           const token=newUser.generateToken();
           res.status(200).json({userId:user._id,token})
       } catch (err) {
        catchError(next);
       }
}


exports.logIn=async (req,res,next)=>{
    try {
        const errors=validationResult(req);
    if(!errors.isEmpty()){
        return next(
            new httpError('Invalid inputs passed, please check your data.', 422)
          );
    }
        const user=await User.findOne({email:req.body.email});
        if(!user){
            const error=new httpError("Couldn't Find Any User",404);
            return next(error);
        }
        const isPasswordValid= await User.comparePassword(req.body.password,user.password);
        if(!isPasswordValid){
            const error=new httpError("Couldn't Find Any User",404);
            return next(error);
        }
        const token=user.generateToken();
        res.status(200).json({userId:user._id,token})
    } catch (err) {
        catchError(next);
    }
}

exports.getUsers=async (req,res,next)=>{
    try {
        const users=await User.find();
        res.status(200).json(users)
    } catch (error) {
        catchError(next);
    }
}