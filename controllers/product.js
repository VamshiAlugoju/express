
 
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    }); 
  }

  exports.postProducts =  (req, res, next) => {

    const product = new Product(req.body.title);
    product.save()
    .then(res=>{
      res.redirect('/');
    })
    .catch(err=>{console.log(err)});
  }
 

 exports.getproductsShop = (req, res, next) => {
     Product.showAll((products)=>{
       
       res.render('shop', {
         prods: products,
         pageTitle: 'Shop',
         path: '/',
         hasProducts: products.length > 0,
         activeShop: true,
         productCSS: true
       });
     });
  }