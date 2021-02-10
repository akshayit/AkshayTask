const mongoose = require('mongoose');

const {
    Schema
} = mongoose;

const orderSchema = new Schema({
    id: Number,
    email: String,
    name: String,
    address: String,
    total: Number,
    cartItems: [{
        id: Number,
        title: String,
        price: Number,
        count: Number,
    }]
});

// Create the model class
const ModelClass = mongoose.model('orders', orderSchema);

module.exports = ModelClass;