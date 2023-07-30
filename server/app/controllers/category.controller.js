const ObjectId = require('mongoose').Types.ObjectId;
const Product = require('../models/product.model');
const Category = require('../models/category.model');


const asyncErrorHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// The getAllCategories function
exports.getAllCategories = asyncErrorHandler(async (req, res, next) => {
  // Find all category documents in the database
  const categories = await Category.find();

  // Return the categories in the response
  res.status(200).json({
    message: 'Categories retrieved successfully',
    categories: categories
  });
});

exports.getSubCategories = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const categories = await Category.find({ parent: categoryId });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// The getCategoryById function
exports.getCategoryById = asyncErrorHandler(async (req, res, next) => {
  // Extract the category ID from the request parameters
  const categoryId = req.params.id;

  // Find the category document by ID
  const category = await Category.findById(categoryId);

  // Check if the category document exists
  if (!category) {
    return res.status(404).json({
      message: 'Category not found',
      error: 'No category found with the given ID'
    });
  }

  // Return the category in the response
  res.status(200).json({
    message: 'Category retrieved successfully',
    category: category
  });
});


  // The createCategory function
exports.createCategory = asyncErrorHandler(async (req, res, next) => {
  // Extract the category data from the request body
  const { name, description } = req.body;

  // Create a new category document
  const category = new Category({
    name: name,
    description: description
  });

  // Save the new category document to the database
  await category.save();

  // Return the new category document in the response
  res.status(201).json({
    message: 'Category created successfully',
    category: category
  });
});

// The updateCategory function
exports.updateCategory = asyncErrorHandler(async (req, res, next) => {
  // Extract the category ID and updated data from the request parameters and body
  const categoryId = req.params.id;
  const { name, description } = req.body;

  // Find the category document by ID
  const category = await Category.findById(categoryId);

  // Check if the category document exists
  if (!category) {
    return res.status(404).json({
      message: 'Category not found',
      error: 'No category found with the given ID'
    });
  }

  // Update the category document with the updated data
  category.name = name;
  category.description = description;

  // Save the updated category document to the database
  await category.save();

  // Return the updated category document in the response
  res.status(200).json({
    message: 'Category updated successfully',
    category: category
  });
});

// The deleteCategory function
exports.deleteCategory = asyncErrorHandler(async (req, res, next) => {
  // Extract the category ID from the request parameters
  const categoryId = req.params.id;

  // Find the category document by ID
  const category = await Category.findById(categoryId);

  // Check if the category document exists
  if (!category) {
    return res.status(404).json({
      message: 'Category not found',
      error: 'No category found with the given ID'
    });
  }

  // Delete the category document from the database
  await category.remove();

  // Return a success response
  res.status(200).json({
    message: 'Category deleted successfully'
  });
});