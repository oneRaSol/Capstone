const mongoose = require('mongoose');
const Product = require('./app/models/product.model.js');

const products = [];

for (let i = 1; i <= 100; i++) {
  const product = new Product({
    id: i,
    name: `Product ${i}`,
    slug: `product-${i}`,
    shortDescription: `Short description for product ${i}`,
    description: `Description for product ${i}`,
    regular_price: Math.floor(Math.random() * 1000) + 1,
    sales_price: Math.floor(Math.random() * 800) + 1,
    sku: `SKU-${i}`,
    stock_status: Math.random() < 0.5? 'instock' : 'outofstock',
    featured: Math.random() < 0.5,
    quantity: Math.floor(Math.random() * 10) + 1,
    image_name: `image-${i}.jpg`,
    image_des: `Image description for product ${i}`,
    category_id: Math.floor(Math.random() * 10) + 1
  });

  products.push(product);
}

module.exports = products;