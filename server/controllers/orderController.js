const Order = require('../models/Order');
const CartTotal = require('../utils/cart-total');

module.exports = {
    addProductToCart: async (req, res, next) => {

        console.log(req.body)

        let isProductExist = await CartTotal.doProductExist(Number(req.body.id));

        if (isProductExist.status) {
            req.body.product_qty = isProductExist.count + 1;
        } else {
            req.body.product_qty = 1
        }

        Order.findOneAndUpdate({
            product_id: Number(req.body.id)
        }, {
            product_id: Number(req.body.id),
            product_qty: req.body.product_qty,
            price: req.body.price
        }, {
            useFindAndModify: false,
            upsert: true
        }, async (err, order) => {
            if (err) {
                console.log(err);
                res.status(422).send({
                    success: false,
                    data: null
                });
            }

            Order.find(async (err, cartProduct) => {
                if (err) {
                    console.log(err);
                    res.status(422).send({
                        success: false,
                        data: []
                    });
                }

                if (!cartProduct.length) {
                    res.status(422).send({
                        success: false,
                        data: []
                    });
                }

                // TODO: calculateBill
                let totalBill = await CartTotal.calculateBill(cartProduct)

                res.json({
                    success: true,
                    data: {
                        id: Number(req.body.id),
                        quantity: req.body.product_qty,
                        price: req.body.price
                    }
                });
            });
        });
    },

    deleteProductFromCart: async (req, res, next) => {

        console.log(req.body)

        let isProductExist = await CartTotal.doProductExist(req.body.id);

        if (isProductExist.status && isProductExist.count > 1) {
            req.body.product_qty = isProductExist.count - 1;

            Order.findOneAndUpdate({
                product_id: req.body.id
            }, async (err, order) => {
                if (err) {
                    console.log(err);
                    res.status(422).send({
                        success: false,
                        data: null
                    });
                }

                Order.find(async (err, cartProduct) => {
                    if (err) {
                        console.log(err);
                        res.status(422).send({
                            success: false,
                            data: null
                        });
                    }

                    if (!cartProduct.length) {
                        res.status(422).send({
                            success: false,
                            data: null
                        });
                    }

                    // TODO: calculateBill
                    let totalBill = await CartTotal.calculateBill(cartProduct)

                    res.json({
                        success: true,
                        data: {
                            id: req.body.id
                        }
                    });
                });
            });
        } else {
            Order.delete({
                product_id: req.body.id
            }, async (err, order) => {
                if (err) {
                    console.log(err);
                    res.status(422).send({
                        success: false,
                        data: null
                    });
                }

                Order.find(async (err, cartProduct) => {
                    if (err) {
                        console.log(err);
                        res.status(422).send({
                            success: false,
                            data: []
                        });
                    }

                    if (!cartProduct.length) {
                        res.status(422).send({
                            success: false,
                            data: []
                        });
                    }

                    // TODO: calculateBill
                    let totalBill = await CartTotal.calculateBill(cartProduct)

                    res.json({
                        success: true,
                        data: {
                            ...totalBill
                        }
                    });
                });
            });
        }
    },

    updateCart: async (req, res, next) => {
        Order.find(async (err, cartProduct) => {
            if (err) {
                console.log(err);
                res.status(422).send({
                    success: false,
                    data: null
                });
            }

            if (!cartProduct.length) {
                res.status(422).send({
                    success: false,
                    data: null
                });
            }

            // TODO: calculateBill
            let totalBill = await CartTotal.calculateBill(cartProduct)

            res.json({
                success: true,
                data: {
                    ...totalBill
                }
            });
        });
    }
}