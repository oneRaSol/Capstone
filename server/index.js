const Category = require('./app/models/category.model');

const categories = [
  { name: 'Fashion & Accessories', description: 'A collection of fashion and accessories' },
  { name: 'Furniture & Home Decors', description: 'A collection of furniture and home decor' },
  { name: 'Digital & Electronics', description: 'A collection of digital and electronics products' },
  { name: 'Tools & Equipments', description: 'A collection of tools and equipment' },
  { name: "Kid’s Toys", description: 'A collection of kid\'s toys' },
  { name: 'Organics & Spa', description: 'A collection of organic and spa products' }
];

const populateCategories = async () => {
  try {
    const result = await Category.insertMany(categories);
    console.log('Categories populated successfully:', result.insertedIds);
  } catch (err) {
    console.error(err);
  }
};

populateCategories();

// const categories = [
//   { name: 'Fashion & Accessories' },
//   { name: 'Furnitures & Home Decors' },
//   { name: 'Digital & Electronics' },
//   { name: 'Tools & Equipments' },
//   { name: 'Kid’s Toys' },
//   { name: 'Organics & Spa' }
// ];

// const populateCategories = async () => {
//   try {
//     const result = await Category.insertMany(categories);
//     console.log('Categories populated successfully:', result.insertedIds);
//   } catch (err) {
//     console.error(err);
//   }
// };

// populateCategories();


// const categories = [
//   { name: 'Fashion & Accessories', parent: null },
//   { name: 'Batteries', parent: 'Fashion & Accessories' },
//   { name: 'Headsets', parent: 'Fashion & Accessories' },
//   { name: 'Screen', parent: 'Fashion & Accessories' },
//   { name: 'Furnitures & Home Decors', parent: null },
//   { name: 'Batteries', parent: 'Furnitures & Home Decors' },
//   { name: 'Headsets', parent: 'Furnitures & Home Decors' },
//   { name: 'Screen', parent: 'Furnitures & Home Decors' },
//   { name: 'Digital & Electronics', parent: null },
//   { name: 'Batteries', parent: 'Digital & Electronics' },
//   { name: 'Headsets', parent: 'Digital & Electronics' },
//   { name: 'Screen', parent: 'Digital & Electronics' },
//   { name: 'Tools & Equipments', parent: null },
//   { name: 'Kid’s Toys', parent: 'Tools & Equipments' },
//   { name: 'Organics & Spa', parent: 'Tools & Equipments' }
// ];

// const populateCategories = async () => {
//   try {
//     await Category.insertMany(categories);
//     console.log('Categories populated successfully');
//   } catch (err) {
//     console.error(err);
//   }
// };

// populateCategories();