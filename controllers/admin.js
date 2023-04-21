const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/edit-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing : false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null , title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.editProducts = (req, res, next) => {
    
  let edit = req.query.edit;
  if(!edit)
    return res.redirect("/");
 
  let Id = req.params.productId;
  console.log(Id);
  Product.findById(Id,product=>{
    if(!product)
      {
        return res.redirect("/");
      }

    res.render('admin/edit-product', {
      pageTitle: 'edit Product',
      path: '/admin/edit-product',
      editing : edit,
      product:product
    }); 
  })
}


exports.postEditproduct = (req,res,next)=>{
  const id= req.body.Id;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(id , title, imageUrl, description, price);
  product.save();
  res.redirect('/admin/products');
}

exports.deleteProduct = (req,res,next)=>{
  const id = req.params.productId;
  console.log(id);
  Product.deleteById(id);
  res.redirect("/admin/products")
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
