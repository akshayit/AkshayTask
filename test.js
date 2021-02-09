var products = [{
        product_id: 1,
        product_qty: 6,
        price: 105
    },
    {
        product_id: 2,
        product_qty: 3,
        price: 5
    },
    {
        product_id: 3,
        product_qty: 3,
        price: 15
    }
]

var discounts = [{
        product_id: 3,
        product_qty: 3,
        discount: 10
    },
    {
        product_id: 1,
        product_qty: 3,
        discount: 5
    },
    {
        product_id: 2,
        product_qty: 2,
        discount: 1
    }
];
let total = 0;

for (const product of products) {
    for (const discount of discounts) {
        if (product.product_id == discount.product_id) {
            let q = Math.floor(product.product_qty / discount.product_qty);
            let dis = (product.price * product.product_qty) - (q*discount.discount)
            total = total + dis;
            console.log(total)
        }
    }
}