const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const Product = require('../models/product.model');
const Category = require('../models/category.model');


exports.getAllProducts = (req, res) => {
  Product.find({}, (err, products) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.json(products);
    }
  });
};

exports.getProductsByCategory = (req, res) => {
  const categoryId = req.params.categoryId;

  Product.find({ category_id: categoryId }, (err, products) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.json(products);
    }
  });
};

exports.getProductById = (req, res) => {
  const productId = parseInt(req.params.productId);
  Product.find({ id: productId }, (err, products) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (products.length === 0) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json(products[0]);
    }
  });
};

exports.getCategoryById = (req, res) => {
  const categoryId = parseInt(req.params.categoryId);
  Category.find({ id: categoryId }, (err, categories) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (categories.length === 0) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.json(categories[0]);
    }
  });
};

exports.getFeaturedProducts = (req, res) => {
  Product.find({ featured: true }, (err, products) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.json(products);
    }
  });
};



const asyncErrorHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

exports.AddNewProduct = asyncErrorHandler(async (req, res, next) => {
  // console.log(req.body.category_id);
  try {
    // Check if the request method is POST
    if (req.method === 'POST') {
      // Extract data from request body
      const { name, description, category_id, image_name, image_des, quantity, featured, stock_status, sales_price, regular_price, shortDescription, slug, sku } = req.body;

      // Validate the stock_status field
      const validStockStatuses = ['in_stock', 'low_stock', 'out_of_stock'];
      if (!validStockStatuses.includes(stock_status)) {
        return res.status(400).json({
          message: 'Invalid stock_status',
          error: `stock_status must be one of ${validStockStatuses.join(', ')}`
        });
      }

      // Generate a unique slug value using the name field
      const slugValue = name.toLowerCase().split(' ').join('-');

      // Check if a product with the same slug already exists
      const existingProduct = await Product.findOne({ slug: slugValue });
      if (existingProduct) {
        return res.status(400).json({
          message: 'Product already exists',
          error: `A product with the slug ${slugValue} already exists`
        });
      }

      // Create a new product document with the extracted data
      const newProduct = new Product({
        name,
        description,
        category_id,
        image_name,
        image_des,
        quantity,
        featured,
        stock_status,
        sales_price,
        regular_price,
        shortDescription,
        slug: slugValue,
        sku
      });

      // Save the new product document to the database
      const savedProduct = await newProduct.save();



      // Return the new product object in the response
      res.status(201).json({
        message: 'Product created successfully',
        product: {
          id: savedProduct.id,
          name: savedProduct.name,
          description: savedProduct.description,
          category_id: savedProduct.category_id,
          image_name: savedProduct.image_name,
          image_des: savedProduct.image_des,
          quantity: savedProduct.quantity,
          featured: savedProduct.featured,
          stock_status: savedProduct.stock_status,
          sales_price: savedProduct.sales_price,
          regular_price: savedProduct.regular_price,
          shortDescription: savedProduct.shortDescription,
          slug: savedProduct.slug,
          sku: savedProduct.sku
        }
      });
    } else {
      // Return a 405 error response if the request method is not POST
      res.status(405).json({
        message: 'Method not allowed'
      });
    }
  } catch (error) {
    // Return an error response if there is an error
    res.status(500).json({
      message: 'Error adding product',
      error: error.message
    });
  }
});


// The updateProduct function
exports.updateProduct = asyncErrorHandler(async (req, res, next) => {
  // Extract the product ID from the request parameters
  const productId = req.params.id;

  // Extract the updated product data from the request body
  const { name, description, category_id, image_name, image_des, quantity, featured, stock_status, sales_price, regular_price, shortDescription, slug, sku } = req.body;

  // Find the product document by ID
  const product = await Product.findByIdAndUpdate(productId, {
    name: name,
    description: description,
    category_id: category_id,
    image_name: image_name,
    image_des: image_des,
    quantity: quantity,
    featured: featured,
    stock_status: stock_status,
    sales_price: sales_price,
    regular_price: regular_price,
    shortDescription: shortDescription,
    slug: slug,
    sku: sku
  }, {
    new: true
  });

  // Check if the product document exists
  if (!product) {
    return res.status(404).json({
      message: 'Product not found',
      error: 'No product found with the given ID'
    });
  }

  // Return the updated product document in the response
  res.status(200).json({
    message: 'Product updated successfully',
    product: product
  });
});


// The deleteProduct function
exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {
  // Extract the product ID from the request parameters
  const productId = req.params.id;

  // Find the product document by ID
  const product = await Product.findById(productId);

  // Check if the product document exists
  if (!product) {
    return res.status(404).json({
      message: 'Product not found',
      error: 'No product found with the given ID'
    });
  }

  // Delete the product document
  await product.remove();

  // Return a success response
  res.status(200).json({
    message: 'Product deleted successfully'
  });
});