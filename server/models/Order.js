const mongoose = require('mongoose');

const {
    Schema
} = mongoose;

const orderSchema = new Schema({
    product_id: {
        type: Number,
        unique: true,
        required: true
    },
    product_qty: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

// Create the model class
const ModelClass = mongoose.model('orders', orderSchema);

module.exports = ModelClass;