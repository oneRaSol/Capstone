const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category_id: {
    type: String,
    required: true
  },
  image_name: {
    type: String,
    required: true
  },
  image_des: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  stock_status: {
    type: String,
    enum: ['in_stock', 'low_stock', 'out_of_stock'],
    required: true
  },
  sales_price: {
    type: Number,
    required: true
  },
  regular_price: {
    type: Number,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  sku: {
    type: String,
    required: true,
    unique: true
  },
  id: {
    type: Number,
    required: true,
    unique: true,
    default: () => Math.floor(Math.random() * 1000000)
    // default: uuidv4
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;