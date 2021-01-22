const Mongoose=require("mongoose");

const URL="mongodb://127.0.0.1:27017/sharePlaces";

Mongoose.connect(URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log(`Connected To ${Mongoose.connection.db.databaseName} Successfully!!!`);
}).catch(err=>{
    console.log(err.message);
})