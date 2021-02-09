console.log('This script populates some products to the database.');

const async = require('async');
const Product = require('./models/Product');
const Discount = require('./models/Discount');
const mongoose = require('mongoose');
const connectDb = require('./connectDB');

connectDb();


function createProduct(productObj, cb) {
  const product = new Product({
    id: productObj.id,
    title: productObj.title,
    description: productObj.description,
    category: productObj.category,
    manufacturer: productObj.manufacturer,
    price: productObj.price,
    imageUrl: productObj.imageUrl
  });

  product.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Product: ' + product);
    cb(null, product);
  });
}



function createDiscount(discountObj, cb) {
  const discount = new Discount({
    product_id: discountObj.product_id,
    product_qty: discountObj.product_qty,
    discount: discountObj.discount
  });

  discount.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Discount: ' + discount);
    cb(null, discount);
  });
}


function generateDiscounts(cb) {
  // First empty the collection.
  Discount.deleteMany({}, () => {

    async.parallel([
        function (callback) {
          createDiscount({
              "product_id": 1,
              "product_qty": 3,
              "discount": 15
            },
            callback
          );
        },

        function (callback) {
          createDiscount({
              "product_id": 2,
              "product_qty": 2,
              "discount": 10
            },
            callback
          );
        },

        function (callback) {
          createDiscount({
              "product_id": 3,
              "product_qty": 3,
              "discount": 20
            },
            callback
          );
        }
      ],
      // optional callback
      cb);
  });
}


function generateProducts(cb) {
  // First empty the collection.
  Product.deleteMany({}, () => {

    async.parallel([
        function (callback) {
          createProduct({
              "id": "1",
              "title": "Product A",
              "category": "Alphabet Letter",
              "subCategory": "Letters",
              "manufacturer": "Alpha Letters",
              "contents": "Alphabets Letters",
              "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.",
              "imageUrl": "http://localhost:5000/product-images/a.jpg",
              "orgPrice": 7,
              "price": 7
            },
            callback
          );
        },
        function (callback) {
          createProduct({
              "id": "2",
              "title": "Product B",
              "category": "Alphabet Letter",
              "subCategory": "Letters",
              "manufacturer": "Alpha Letters",
              "contents": "Alphabets Letters",
              "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.",
              "imageUrl": "http://localhost:5000/product-images/b.jpg",
              "orgPrice": 5,
              "price": 5
            },
            callback
          );
        },
        function (callback) {
          createProduct({
              "id": "3",
              "title": "Product C",
              "category": "Alphabet Letter",
              "subCategory": "Letters",
              "manufacturer": "Alpha Letters",
              "contents": "Alphabets Letters",
              "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.",
              "imageUrl": "http://localhost:5000/product-images/c.jpg",
              "orgPrice": 7,
              "price": 7
            },
            callback
          );
        },
        function (callback) {
          createProduct({
              "id": "4",
              "title": "Product D",
              "category": "Alphabet Letter",
              "subCategory": "Letters",
              "manufacturer": "Alpha Letters",
              "contents": "Alphabets Letters",
              "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.",
              "imageUrl": "http://localhost:5000/product-images/d.jpg",
              "orgPrice": 5,
              "price": 5
            },
            callback
          );
        },
        function (callback) {
          createProduct({
              "id": "5",
              "title": "Product E",
              "category": "Alphabet Letter",
              "subCategory": "Letters",
              "manufacturer": "Alpha Letters",
              "contents": "Alphabets Letters",
              "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.",
              "imageUrl": "http://localhost:5000/product-images/e.jpg",
              "orgPrice": 7,
              "price": 7
            },
            callback
          );
        },
        function (callback) {
          createProduct({
              "id": "6",
              "title": "Product F",
              "category": "Alphabet Letter",
              "subCategory": "Letters",
              "manufacturer": "Alpha Letters",
              "contents": "Alphabets Letters",
              "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.",
              "imageUrl": "http://localhost:5000/product-images/f.jpg",
              "orgPrice": 5,
              "price": 5
            },
            callback
          );
        }
      ],
      // optional callback
      cb);
  });
}

async.series(
  [
    generateProducts,
    generateDiscounts
  ],
  // Optional callback
  (err, results) => {
    if (err) {
      console.log('Data Creation Error: ' + err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);