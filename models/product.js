
const { json } = require("body-parser");
const { fileLoader } = require("ejs");
const fs = require("fs");

let products =[];

 function readOnce(cb)
 {  
        fs.readFile("models/store.json" , (err,content)=>{
            products = JSON.parse(content);  
           if(cb)
           {
               cb(products);
           } 
       })
 }

 class Product {
    
    constructor(name){
        this.title = name
    }

    save()
    {
     products.push(this);
     fs.writeFile("models/store.json", JSON.stringify( products) ,(err)=>{
       console.log(err)
    });
    }

    static  showAll(cb)
    {  
         readOnce(cb);
    }
}
 

module.exports = Product;