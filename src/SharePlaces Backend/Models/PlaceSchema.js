const Mongoose=require("mongoose");

const PlaceSchema=new Mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title must not be empty"]
    },
    description:{
        type:String,
        required:[true,"Description must not be empty"]
    },
    image:{
        type:String
    },
    address:{
        type:String,
        required:[true,"Address of location is required"]
    },
    creator:{
        type:Mongoose.SchemaTypes.ObjectId,
        ref:"Users",
        required:[true,"Must have a creator"]
    }
})

module.exports=Mongoose.model("Places",PlaceSchema);