const mongoose = require('mongoose');

const {
    Schema
} = mongoose;

const discountSchema = new Schema({
    product_id: {
        type: Number,
        required: true
    },
    product_qty: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    }
});

// Create the model class
const ModelClass = mongoose.model('discounts', discountSchema);

module.exports = ModelClass;