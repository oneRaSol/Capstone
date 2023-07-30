const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const dbConfig = require("./app/config/db.config");
const productController = require('./app/controllers/product.controller');
const categoryController = require('./app/controllers/category.controller');
const cartController  = require('./app/controllers/cart.controller');

const bodyParser = require('body-parser');

const app = express();

// Use body-parser middleware to parse incoming JSON data
app.use(bodyParser.json());

/* for Angular Client (withCredentials) */
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "capstone-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true
  })
);

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple testing route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Capstone Bargains application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);




app.get('/api/products', productController.getAllProducts);
app.get('/api/products/:productId', productController.getProductById);
app.get('/products', productController.getFeaturedProducts);
app.post('/product/add', productController.AddNewProduct);
app.put('/product/:id', productController.updateProduct);
app.delete('/product/:id', productController.deleteProduct);

app.get('/api/categories/:categoryId', productController.getProductsByCategory);
app.get('/api/categories', categoryController.getAllCategories);
app.get('/api/categories/subcategories', categoryController.getSubCategories)

app.get('/api/categories/:categoryId', categoryController.getCategoryById);
app.post('/api/categories', categoryController.createCategory);
app.put('/api/categories/:id', categoryController.updateCategory);
app.delete('/api/categories/:categoryId', categoryController.deleteCategory);

// Define routes for cart requests
app.post('/api/cart/add', cartController.addProductToCart);
app.get('/api/cart/data/:userId', cartController.getCartData)
app.delete('/api/cart/item/delete/:userId/:productId', cartController.deleteItemFromCart)
app.get('/api/cart/count/:userId', cartController.getCartCount );



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
