
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const path = require('path');

module.exports = function(app) {

  app.get('/api/get-all-products', productController.getAllProduct);

  app.post('/api/get-product-by-id', productController.getProductById);

  app.post('/api/add-to-cart', orderController.addProductToCart);

  app.post('/api/delete-from-cart', orderController.deleteProductFromCart);

  app.post('/api/update-cart', orderController.updateCart);

  app.get('/product-images/:img', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, '../../product_images', req.params.img))
  });

  // Global error handler to send output.
  app.use(function (err, req, res) {
    console.log(req.url)
    res.status(500).send('Server error!');
  });
}
