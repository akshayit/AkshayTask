const Product = require('../models/Product');

module.exports = {
    getAllProduct: async (req, res, next) => {
        Product.find(function (err, allProduct) {
            if (err) {
                console.log(err);
                res.status(422).send({
                    success: false,
                    data: []
                });
            }

            if (!allProduct.length) {
                res.status(422).send({
                    success: false,
                    data: []
                });
            }

            res.json({
                success: true,
                data: allProduct
            });
        });
    },

    getProductById: async (req, res, next) => {
        Product.findOne({
            Id: req.body.id
        }, function (err, product) {
            if (err) {
                console.log(err);
                res.status(422).send({
                    success: false,
                    data: null
                });
            }

            if (!Object.keys(product).length) {
                res.status(422).send({
                    success: false,
                    data: null
                });
            }

            res.json({
                success: true,
                data: product
            });
        });
    }
}