const Express=require("express");
const userController=require("../Controller/UserController");
const uploadImage=require("../Middlewares/uploadFile")
const {check}=require("express-validator");

const Router=Express.Router();

Router.route("/").get(userController.getUsers);
Router.route("/signup").post(
    uploadImage.single("image"),
    [
        check("name").isLength({min:1}),
        check("email").isEmail(),
        check("password").isLength({min:6})
    ],
    userController.signUp);
Router.route("/login").post(
    [
        check("email").isEmail(),
        check("password").isLength({min:6})
    ],
    userController.logIn);

module.exports=Router;