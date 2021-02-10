const mongoose = require('mongoose');

const {
  Schema
} = mongoose;

const productSchema = new Schema({
  id: Number,
  title: String,
  description: String,
  image: String,
  price: Number
});

// Create the model class
const ModelClass = mongoose.model('products', productSchema);

module.exports = ModelClass;