
const db = require("../util/database");
 
const getProductsFromFile = cb => {
  
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
    return  db.execute("insert into products (title,price,description,imageUrl) VALUES (?,?,?,?)",
    [this.title,this.price,this.description,this.imageUrl]
    )
  }

  static fetchAll() {
   return  db.execute("select * from products")
   
  }

  static findById(id) {
   return db.execute("SELECT * FROM products WHERE id=?",[id]);
  }

  static deleteById(id)
  {
   return db.execute("DELETE FROM products WHERE id=?",[id]);
  }
};


