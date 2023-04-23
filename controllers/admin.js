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
  req.user.createProduct({
    title,
    price,
    imgurl:imageUrl,
    description
  })
  .then(result=>{
       res.redirect("/admin/products");
   })
   .catch(err=>console.log(err))

  res.redirect('/');
};


exports.editProducts = (req, res, next) => {
    
  let edit = req.query.edit;
  if(!edit)
    return res.redirect("/");
 
  let Id = req.params.productId;
  console.log(Id);
  Product.findByPk(Id)
  .then(product=>{
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
  .catch(err=>console.log(err));
}


exports.postEditproduct = (req,res,next)=>{
  const id= req.body.Id;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.findByPk(id)
  .then(product=>{
    product.id = id;
    product.title = title;
    product.price = price;
    product.imgurl = imageUrl;
    product.description = description
    return  product.save();
  })
  .then(result=>{
    console.log("updated product")
    res.redirect('/admin/products');
  })
  .catch(err=>console.log(err))
 
}

exports.deleteProduct = (req,res,next)=>{
  const id = req.params.productId;
  console.log(id);
  Product.findByPk(id)
  .then(product=>{
     return product.destroy()
  })
  .then(result=>{
    console.log("destroyed product")
    res.redirect("/admin/products")
  })
  .catch(err=>console.log(err))
}

exports.getProducts = (req, res, next) => {
 
  Product.findAll()
.then(products=>{
  res.render('admin/products', {
    prods: products,
    pageTitle: 'Admin Products',
    path: '/admin/products'
  })
})
.catch(err=>{
  console.log(err)
})
};

