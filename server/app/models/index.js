const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.product = require("./product.model");
db.category = require("./category.model");

// db.ROLES = ["user", "admin"];
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;