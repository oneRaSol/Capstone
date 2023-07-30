
const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  quantity: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageName: { type: String, required: true },
  shortDescription: { type: String, required: true },
});

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [productSchema],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;