const express = require("express");
const router = express.Router();

router.get("/login" , (req,res,next)=>{
    res.send('<form action="/login" onsubmit ="localStorage.setItem(`username`, document.getElementById(`name`).value)"  method="post"> <label for="name" >username</label> <input type="text" name="name" id="name"><input type="submit" name="btn" id="btn" value="click"></form>')
})

router.post("/login",(req,res,next)=>{
    console.log( "this is body of login" , req.body);
    res.redirect("/");
})



// document.getElementById("dis").innerText = localStorage.getItem("username") + ":" + document.getElementById("message").value
module.exports = router;