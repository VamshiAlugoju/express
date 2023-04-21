const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {

    getProductsFromFile(products => {
      if(this.id)
      {
        let existingProduct = products.findIndex(
          prod => prod.id == this.id
        )
        let updatedproduct = [...products];
        updatedproduct[existingProduct] = this;
        fs.writeFile(p, JSON.stringify(updatedproduct), err => {
          console.log(err);
        });

      }
      else{
        products.push(this);
        this.id = Math.random().toString();
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });

      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }

  static deleteById(id)
  {
    getProductsFromFile(products=>{
         let updatedProducts = products.filter(prod=>{
          return prod.id != id;
         })

         fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
         
    })
  }
};
