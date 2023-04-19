 const express = require("express");
 const router = express.Router();
 
 const path = require("path")
 const contactController = require("../controllers/contact");

 router.get("/",contactController.contactPage)

 router.post("/" ,contactController.contactPost)

 exports.router = router