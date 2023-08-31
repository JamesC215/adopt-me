const mongoose = require('mongoose');
const donationItemSchema = require('./DonationItemSchema');
const Schema = mongoose.Schema;

const lineItemSchema = new Schema({
    qty: { type: Number, default: 1 },
    item: donationItemSchema
}, {
    timestamps: true,
    toJSON: { virtuals: true },
}
);

lineItemSchema.virtual('extPrice').get(function () {
    // 'this' keyword is bound to the lineItem document
    return this.qty * this.item.price;
});

const donationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    lineItems: [lineItemSchema],
    isPaid: { type: Boolean, default: false},
}, {
    timestamps: true,
    toJSON: { virtuals: true }
}
);

donationSchema.virtual('orderTotal').get(function() {
    return this.lineItems.reduce((total, item) => total + item.extPrice, 0 );
});

donationSchema.virtual('totalQty').get(function() {
    return this.lineItems.reduce((total, item) => total + item.qty, 0 );
});

donationSchema.virtual('orderId').get(function() {
    return this.id.slice(-6).toUpperCase();
});

donationSchema.statics.getCart = function(userId) {
    return this.findOneAndUpdate(
        { user: userId, isPaid: false },
        { user: userId },
        { upsert: true, new: true }
    );
};

donationSchema.methods.addItemToCart = async function (itemId) {
    const cart = this;
    const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
    if (lineItem) {
      lineItem.qty += 1;
    } else {
      const Item = mongoose.model('Item');
      const item = await Item.findById(itemId);
      cart.lineItems.push({ item });
    }
    return cart.save();
  };

 
donationSchema.methods.setItemQty = function(itemId, newQty) {
    const cart = this;
    const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
    if (lineItem && newQty <= 0) {
      lineItem.deleteOne();
    } else if (lineItem) {
      lineItem.qty = newQty;
    }
    return cart.save();
  };

module.exports = mongoose.model('Order', donationSchema);