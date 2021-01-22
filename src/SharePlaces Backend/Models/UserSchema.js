const Mongoose=require("mongoose");
const BcryptJs=require("bcryptjs");
const httpError = require("../Utils/httpError");
const Jwt=require("jsonwebtoken");

const userSchema=new Mongoose.Schema({
    name:{
       type:String,
       required:[true,"Name is required"]
    },
    email:{
       type:String,
       required:[true,"Email is required"],
       unique:true
    },
    password:{
       type:String,
       minlength:[6,"Password must be atleast 6 character long"]
    },
    image:{
      type:String
   },
    places:[{
       type:Mongoose.SchemaTypes.ObjectId,
       ref:"Places",
       default:[]
    }]
});

userSchema.methods.generateToken=function(){
     return Jwt.sign({userId:this._id},"TANISHTIMIZAMEMNUNOLDUM",{expiresIn:"1h"})
}

userSchema.statics.comparePassword= async (rawPassword,hashedPassword)=>await ( BcryptJs.compare(rawPassword,hashedPassword))

userSchema.pre("save",async function(next){
   try {
      let user=this;
      const hashedPassword=await BcryptJs.hash(user.password,12);
      user.password=hashedPassword;
      next();
   } catch (err) {
      const error=httpError("Coudln't Create User.Try Again",400);
      next(error);
   }
})

module.exports=Mongoose.model("Users",userSchema);