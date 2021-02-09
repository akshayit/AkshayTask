const Discount = require('../models/Discount');
const Order = require('../models/Order');

module.exports = {
    doProductExist: async (product_id) => {
        return new Promise(async (resolve, reject) => {
            console.log(product_id)
            Order.findOne({
                product_id: product_id
            }, async (err, cartProduct) => {
                if (err) {
                    console.log(err);
                    resolve({
                        status: false
                    });
                }

                if (!cartProduct || cartProduct === null) {
                    resolve({
                        status: false
                    });
                }

                resolve({
                    status: true,
                    count: cartProduct.toObject().product_qty
                });
            });
        })
    },
    calculateBill: async (products) => {
        return new Promise(async (resolve) => {
            Discount.find(function (err, discnt) {
                if (err) {
                    console.log(err);
                    resolve({
                        success: false,
                        data: []
                    });
                }

                console.log(discnt);

                let discounts = discnt;

                let total = 0;

                for (const product of products) {
                    for (const discount of discounts) {
                        if (product.product_id == discount.product_id) {
                            let q = Math.floor(product.product_qty / discount.product_qty);
                            let dis = (product.price * product.product_qty) - (q * discount.discount)
                            total = total + dis;
                            console.log(total)
                        }
                    }
                }

                resolve({
                    success: true,
                    data: {
                        total: total,
                        items: products
                    }
                });
            });
        })
    }
}