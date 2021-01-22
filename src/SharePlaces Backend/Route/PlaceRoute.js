const Express=require("express");
const placeController=require("../Controller/PlaceController");
const FileUpload=require("../Middlewares/uploadFile")
const {check}=require("express-validator");
const auth=require("../Middlewares/auth");

const Router=Express.Router();

Router.route("/")
.get(placeController.getAllPlaces)
.post(
    auth,
    FileUpload.single("image"),
    [
    check("title").isLength({min:1}),
    check("description").isLength({min:1}),
    check("address").isLength({min:1})
    ],
    placeController.createPlace);
    Router.route("/user/:userId").get(placeController.getPlaceByUser);
    Router.route("/:placeId")
    .get(placeController.getSinglePlace).
    delete(auth,placeController.deletePlace).
    put(auth,
        [
            check("title").isLength({min:1}),
            check("description").isLength({min:1}),
            check("address").isLength({min:1})
            ],
        placeController.updatePlace);

module.exports=Router;