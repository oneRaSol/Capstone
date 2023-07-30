const express = require('express');
const mongoose = require('mongoose');
const Category = require('./app/models/category.model.js');

const app = express();

// Set the strictQuery option to false to suppress the deprecation warning
mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/capstone_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('MongoDB connected!');

  // Seed the categories
  const seedCategories = async () => {
    try {
      const fashionAndAccessoriesCategory = new Category({
        name: 'Fashion & Accessories'
      });

      const batteriesCategory = new Category({
        name: 'Batteries',
        parent: fashionAndAccessoriesCategory._id
      });

      const headsetsCategory = new Category({
        name: 'Headsets',
        parent: fashionAndAccessoriesCategory._id
      });

      const screenCategory = new Category({
        name: 'Screen',
        parent: fashionAndAccessoriesCategory._id
      });

      const furnituresAndHomeDecorCategory = new Category({
        name: 'Furnitures & Home Decors'
      });

      const batteriesCategory2 = new Category({
        name: 'Batteries',
        parent: furnituresAndHomeDecorCategory._id
      });

      const headsetsCategory2 = new Category({
        name: 'Headsets',
        parent: furnituresAndHomeDecorCategory._id
      });

      const screenCategory2 = new Category({
        name: 'Screen',
        parent: furnituresAndHomeDecorCategory._id
      });

      const digitalAndElectronicsCategory = new Category({
        name: 'Digital & Electronics'
      });

      const batteriesCategory3 = new Category({
        name: 'Batteries',
        parent: digitalAndElectronicsCategory._id
      });

      const headsetsCategory3 = new Category({
        name: 'Headsets',
        parent: digitalAndElectronicsCategory._id
      });

      const screenCategory3 = new Category({
        name: 'Screen',
        parent: digitalAndElectronicsCategory._id
      });

      const toolsAndEquipmentsCategory = new Category({
        name: 'Tools & Equipments'
      });

      const kidToysCategory = new Category({
        name: 'Kid’s Toys',
        parent: toolsAndEquipmentsCategory._id
      });

      const organicsAndSpaCategory = new Category({
        name: 'Organics & Spa',
        parent: toolsAndEquipmentsCategory._id
      });

      await fashionAndAccessoriesCategory.save();
      await batteriesCategory.save();
      await headsetsCategory.save();
      await screenCategory.save();
      await furnituresAndHomeDecorCategory.save();
      await batteriesCategory2.save();
      await headsetsCategory2.save();
      await screenCategory2.save();
      await digitalAndElectronicsCategory.save();
      await batteriesCategory3.save();
      await headsetsCategory3.save();
      await screenCategory3.save();
      await toolsAndEquipmentsCategory.save();
      await kidToysCategory.save();
      await organicsAndSpaCategory.save();

      console.log('Categories seeded successfully!');
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };

  seedCategories();
});