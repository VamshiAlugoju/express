const express = require("express");
const bodyParser = require("body-parser");
const app = express();


const login = require("./routes/login");
const message  = require("./routes/send");


app.use(bodyParser.urlencoded({extended: false}));

app.use(login);
app.use(message);
  

app.listen(2000,()=>{
    console.log("server is running " )
}) 

