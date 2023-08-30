require('dotenv').config();
require('./config/database');

const Category = require('./models/category');
const Item = require('./models/item');

// IIFE
// Immediately Invoked Function Expression
(async function() {
  await Category.deleteMany({});
  const categories = await Category.create([
    {name: 'Monetary', sortOrder: 10},
    {name: 'Food', sortOrder: 20},
    {name: 'Bedding', sortOrder: 30},
    {name: 'Treats', sortOrder: 40},
    {name: 'Toys', sortOrder: 50},
  ]);

  await Item.deleteMany({});
  const items = await Item.create([
    {name: 'Donate £1', category: categories[0], price: 1.00},
    {name: 'Donate £5', category: categories[0], price: 5.00},
    {name: 'Donate £10', category: categories[0], price: 10.00},
    {name: 'Can of Wet Food', category: categories[1], price: 2.15},
    {name: 'Bag of Dry Food', category: categories[1], price: 5.95},
    {name: 'Raw Dog Food', category: categories[1], price: 7.95},
    {name: 'Sleeping Bed', category: categories[2], price: 20.95},
    {name: 'Dog Armchair', category: categories[2], price: 18.95},
    {name: 'Chicken Bites', category: categories[3], price: 3.05},
    {name: 'Gravy Bones', category: categories[3], price: 2.40},
    {name: 'Beef Chews', category: categories[3], price: 1.95},
    {name: 'Rainbow Rope', category: categories[4], price: 3.95},
    {name: 'Fluffy Bunny', category: categories[4], price: 8.20},
  ]);

  console.log(items)

  process.exit();

})();
