const Schema = require('mongoose').Schema;

const donationItemSchema = new Schema({
  name: { type: String, required: true },
  category: {type: Schema.Types.ObjectId, ref: 'Category'},
  price: { type: Number, required: true }
}, {
  timestamps: true
});

module.exports = donationItemSchema;
