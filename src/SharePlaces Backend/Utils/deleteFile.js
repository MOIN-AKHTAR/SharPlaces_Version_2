const fs=require("fs");

const deleteFile=(path)=>{
    fs.unlink(path,()=>{});
}

module.exports=deleteFile;