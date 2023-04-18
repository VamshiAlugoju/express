const express = require("express");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded());

app.use( "/add-product" , (req,res,next)=>{
    res.send('<form action="/product" method="post"><input type="text" name="name" id="Name"><input type="text" name="size" id="size"><input type="submit" name="btn" id="btn" value="click"></form>')
})

app.use("/product" , (req,res,next)=>{
    console.log(req.body);
    res.redirect("/");
})

app.use( "/" , (req,res,next)=>{
     
    res.send("hellof")
})

app.listen(4000)