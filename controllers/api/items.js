const DonationItem = require('../../models/DonationItem');

module.exports = {
  index,
  show
};

async function index(req, res) {
  const items = await DonationItem.find({}).sort('name').populate('category').exec();
  items.sort((a, b) => a.category.sortOrder - b.category.sortOrder);
  res.json(items);
}

async function show(req, res) {
  const item = await DonationItem.findById(req.params.id);
  res.json(item);
}
