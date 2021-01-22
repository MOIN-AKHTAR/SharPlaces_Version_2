const Express=require("express");
const BodyParser=require("body-parser");
const Path=require("path");
const httpError=require("./Utils/httpError");
const UserRoute=require("./Route/UserRoute");
const PlaceRoute=require("./Route/PlaceRoute");
const Morgan=require("morgan");
const deleteFile = require("./Utils/deleteFile");
require("./Connection");

const App=Express();

// Middlewares
App.use(BodyParser.json());
App.use(BodyParser.urlencoded({extended:true}));
App.use(Morgan("dev"));
App.use("/Public/Images",Express.static(Path.join(__dirname,"Public","Images")));

// CORS SETUP
App.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin","http://localhost:3000");
  res.header("Access-Control-Allow-Methods","POST,PUT,DELETE,GET");
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Authorization,Accept")
  next();
})

// Mounting Up Routes
App.use("/api/v1/user",UserRoute);
App.use("/api/v1/place",PlaceRoute);

// No Path Found Middleware
App.use((req,res,next)=>{
  const error=new httpError("Couldn't Find Path",404);
  throw error;
})

// Error Middleware
App.use((err,req,res,next)=>{
  if(req.file){
      deleteFile(req.file.path);
  }
    res.status(err.errorCode || 500).json({message:err.message || "Internal Error"});
  })

// Listening To Server
App.listen(5000,(err)=>{
    if(err){
        return console.log("Server not running");
    }
    console.log("Server Running On Port 5000");
});


// mongod --port 27017 --dbpath "C:\data\db" --replSet rs0 --bind_ip localhost   For running you localhost as replica set-