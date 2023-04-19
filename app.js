const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,"public")))

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const contactRoute = require("./routes/contact");


app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use("/contact" ,contactRoute.router)
app.get("/success" , (req,res,next)=>{
    res.sendFile(path.join(__dirname , "views" , "success.html"));
})

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname , "views" , "pageNotfound.html"));
});

app.listen(4000);
