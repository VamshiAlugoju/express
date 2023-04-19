
const  path = require("path");  

exports.contactPage = (req,res,next)=>{
    
    res.sendFile(path.join(__dirname,".." , "views" , "contact.html"));
}

exports.contactPost =  (req,res,next)=>{
    res.redirect("/success");
 }

 

exports.successPage = (req, res, next) => {
    res.status(404).sendFile(path.join(__dirname , "views" , "pageNotfound.html"));
}