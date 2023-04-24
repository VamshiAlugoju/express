const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      // console.log( "carts are", cart);
      return cart.getProducts();
    })
    .then((products) => {
      // console.log(products);
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  // console.log( "id is" , prodId);
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0)
       product = products[0];

      let newquantity = 1;
      if (product) {
        newquantity = product.CartItems.quantity + 1;
        return fetchedCart.addProduct(product, {
          through: { quantity: newquantity },
        });
      }
      
      return Product
        .findByPk(prodId)
        .then((product) => {
          // console.log(product);
          fetchedCart.addProduct(product, {
            through: { quantity: newquantity },
          });
        })
        .then(result=>{})
        .catch((err) => console.log(err));
    })
    .then(result=>{
      res.redirect("/cart")
    })
    .catch((err) => console.log(err));
};

exports.deleteCart = (req,res,next)=>{

  const prodId = req.body.productId;
  
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product = products[0];
       product.CartItems.destroy();
    })
    .then(result=>{
      res.redirect("/cart")
    })
    .catch((err) => console.log(err));

}

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
