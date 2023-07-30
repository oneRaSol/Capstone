// const controller = require("../controllers/product.controller");

//   app.get('/api/categories/:categoryId', (req, res) => {
//     const categoryId = req.params.categoryId;
  
//     Category.findById(categoryId, (err, category) => {
//       if (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Internal server error' });
//       } else if (!category) {
//         res.status(404).json({ message: 'Category not found' });
//       } else {
//         res.json(category);
//       }
//     });
//   });