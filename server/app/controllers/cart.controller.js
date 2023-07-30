const express = require("express");
const router = express.Router();
const Cart = require("../models/cart.model");
const Product = require('../models/product.model');


// Get cart count for a specific user
exports.getCartCount = async (userId) => {
  try {
    const cart = await Cart.findOne({ userId });
    const count = cart.items.reduce((total, item) => total + item.quantity, 0);
    return count;
  } catch (err) {
    console.error(err);
    return 0;
  }
};


// Add a product to the cart
exports.addProductToCart = async (req, res) => {
  console.log('request body:', req.body);
  const { productId, quantity, name, price, imageName, shortDescription } = req.body;
  const { userId } = req.body;
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $addToSet: { products: { productId, quantity, name, price, imageName, shortDescription } } },
      { new: true, upsert: true },
    );
    res.json({ message: "Product added to cart", cart });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get the data for the cart
exports.getCartData = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res.json({ cart: { products: [] } });
    } else {
      const products = await Promise.all(cart.products.map(async (product) => {
        const productDoc = await Product.findOne({ productId: product.productId });
        return {
        ...productDoc._doc,
          quantity: product.quantity,
        };
      }));
      res.json({ cart: { products } });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a product from the cart
exports.deleteItemFromCart = async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { products: { productId } } },
      { new: true }
    );
    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
    } else {
      res.json({ message: "Product removed from cart", cart });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};