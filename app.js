const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const Product = require('./models/Product');
const Order = require('./models/Order');
const Discount = require('./models/Discount');

const app = express();
app.use(bodyParser.json());

app.use("/", express.static(__dirname + "/build"));
app.get("/", (req, res) => res.sendFile(__dirname + "/build/index.html"));

app.get("/api/products", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

app.post("/api/total", async (req, res) => {
    console.log(req.body)
    let products = req.body;
    let discounts = await Discount.find({});

    let checkTot = await products.reduce((a, c) => a + c.price * c.count, 0);

    if (checkTot > 150) {
        res.status(200).json({
            total: total
        });
    } else {
        let total = 0;

        for (const product of products) {
            for (const discount of discounts) {
                if (product.id === discount.product_id) {
                    let q = Math.floor(product.count / discount.product_qty);
                    let dis = (product.price * product.count) - (q * discount.discount)
                    total = total + dis;
                    console.log(total)
                }
            }
        }

        res.status(200).json({
            total: total
        });
    }
})

app.delete("/api/products/:id", async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
});

app.get('/product-images/:img', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, './product_images', req.params.img))
});



app.post("/api/orders", async (req, res) => {
    if (
        !req.body.cartItems
    ) {
        return res.send({
            message: "Data is required."
        });
    }

    let discounts = await Discount.find({})
    console.log(discounts);

    let checkTot = await req.body.cartItems.reduce((a, c) => a + c.price * c.count, 0);

    if (checkTot > 150) {
        req.body.total = total;
        const order = await Order(req.body).save();
        res.send(order);
    } else {

        let total = 0;

        for (const product of req.body.cartItems) {
            for (const discount of discounts) {
                if (product.id === discount.product_id) {
                    let q = Math.floor(product.count / discount.product_qty);
                    let dis = (product.price * product.count) - (q * discount.discount)
                    total = total + dis;
                    console.log(total)
                }
            }
        }
        req.body.total = total;
        const order = await Order(req.body).save();
        res.send(order);
    }
});


module.exports = app;