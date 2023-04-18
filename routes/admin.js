const express = require("express");
const router = express.Router();

router.get("/add-product" , (req,res,next)=>{
    res.send('<form action="/admin/product" method="post"><input type="text" name="name" id="Name"><input type="text" name="size" id="size"><input type="submit" name="btn" id="btn" value="click"></form>')
})

router.post("/product",(req,res,next)=>{
    console.log(req.body);
    res.redirect("/");
})


module.exports = router;