const Place=require("../Models/PlaceSchema");
const httpError=require("../Utils/httpError");
const {catchError}=require("../Utils/CatchError");
const User=require("../Models/UserSchema")
const Mongoose=require("mongoose");
const {validationResult}=require("express-validator");
const deleteFile=require("../Utils/deleteFile")

exports.createPlace=async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return next(
            new httpError('Invalid inputs passed, please check your data.', 422)
          );
    }
    const sess=await Mongoose.startSession();
    sess.startTransaction();
    try {
        const user=await User.findById(req.userData.userId);
        if(!user){
            const error=new httpError("Couldn't Find User",404);
            return next(error);
        }
        const {title,description,address,creator}=req.body;
        const place=new Place({
            title,
            description,
            address,
            creator: req.userData.userId,
            image:req.file?req.file.path:"/Public/Images/noImage.jpg"
        });
        const newPlace=await place.save({session:sess});
        user.places.push(newPlace);
        await user.save({session:sess});
        await sess.commitTransaction();
        res.status(201).json({place:newPlace.toObject({getters:true})});
    } catch (error) {
        await sess.abortTransaction();
        catchError(next);
    }
}

exports.getSinglePlace=async (req,res,next)=>{
      try {
          const id=req.params.placeId;
          const place=await Place.findById(id);
          if(!place){
              const err=new httpError("Couldn't any place with this ID",404);
              return next(err);
          }
          res.status(200).json(place);
      } catch (error) {
        catchError(next);
      }
}

exports.getAllPlaces=async (req,res,next)=>{
    try {
        const places=await Place.find();
        res.status(200).json(places);
    } catch (error) {
        catchError(next)
    }
}

exports.getPlaceByUser=async (req,res,next)=>{
    try {
        const userId=req.params.userId;
        const places=await Place.find({creator:userId});
        res.status(200).json({places})
    } catch (error) {
        catchError(next);
    }
}

exports.deletePlace=async (req,res,next)=>{
    const sess=await Mongoose.startSession();
    sess.startTransaction();
    try {
        const id=req.params.placeId;
        const place=await Place.findById(id).populate("creator");
        if(!place){
            const err=new httpError("Couldn't find any place with this ID",404);
            return next(err);
        }

        if(req.userData.userId.toString()!==place.creator._id.toString()){
            const error=new httpError("You are not authorized",403);
            return next(error);
        }
        const imagePath=place.image;
        place.creator.places.pull(place);
        await place.remove({session:sess});
        await place.creator.save({session:sess});
        await sess.commitTransaction();
        deleteFile(imagePath);
        res.status(200).json({success:true})
    } catch (error) {
        await sess.abortTransaction();
        catchError(next);
    }
}

exports.updatePlace=async (req,res,next)=>{
    try {
        const id=req.params.placeId;
        const errors=validationResult(req);
    if(!errors.isEmpty()){
        return next(
            new httpError('Invalid inputs passed, please check your data.', 422)
          );
    }
        const place=await Place.findById(id);
        if(!place){
            const err=new httpError("Couldn't find any place with this ID",404);
            return next(err);
        }
        if(req.userData.userId.toString()!==place.creator.toString()){
            const error=new httpError("You are not authorized",403);
            return next(error);
        }
        const {title,description,address}=req.body;
        place.title=title;
        place.description=description;
        place.address=address;
        await place.save();
        res.status(200).json(place);
    } catch (error) {
        catchError(next);
    }
}

