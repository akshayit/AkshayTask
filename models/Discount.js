const mongoose = require('mongoose');

const {
    Schema
} = mongoose;

const discountSchema = new Schema({
    product_id: Number,
    product_qty: Number,
    discount: Number
});

// Create the model class
const ModelClass = mongoose.model('discounts', discountSchema);

module.exports = ModelClass;