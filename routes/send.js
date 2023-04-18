const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get( "/" , (req,res,next)=>{
    let text = fs.readFileSync("./text.txt").toString();
    text =  text === " " ? "no messages" : text;
    res.send(` <p id="dis">  ${text}</p>
     <form action="/" method="post"
      onsubmit=" 
       document.getElementById('username').value =  localStorage.getItem('username');
       "
        > 
     <label for="message" >messege</label> 
     <input type="text" name="message" id="message">
     <input type="hidden" name="username" id="username">
     <input type="submit" name="btn" id="btn" value="send">
     
     </form>`)
  })
  
  router.post( "/" , (req,res)=>{
  
      let text = fs.readFileSync("./text.txt").toString();
          text = text + " " + req.body.username +":"+req.body.message;
      fs.writeFileSync("./text.txt" , text)
      res.redirect("/");
  })


module.exports = router;