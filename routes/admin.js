const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const adminControllers = require("../controllers/product");

const router = express.Router();


// /admin/add-product => GET
router.get('/add-product', adminControllers.getProducts );

// /admin/add-product => POST
router.post('/add-product',adminControllers.postProducts);

module.exports = router;
// exports.products = adminControllers.products;
 