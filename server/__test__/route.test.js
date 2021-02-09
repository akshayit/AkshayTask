const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const {
    expect
} = require('chai');
const sinon = require('sinon');
const app = require('../../../index');
const {
    clearDatabase
} = require('../../helpers/ClearDB');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Discount = require('../models/Discount');

require('sinon-mongoose');
require('sinon-as-promised');

describe('## Tasks API Tests', () => {

    let sandbox, user;

    before((done) => {
        Product.create({
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
          }, {
			"Id": "2",
			"Title": "Product B",
			"Category": "Alphabet Letter",
			"SubCategory": "Letters",
			"Manufacturer": "Alpha Letters",
			"Contents": "Alphabets Letters",
			"Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.",
			"ImageUrl": "http://localhost:5000/product-images/b.jpg",
			"OrgPrice": 5,
			"Price": 5
		}, {
			"Id": "3",
			"Title": "Product C",
			"Category": "Alphabet Letter",
			"SubCategory": "Letters",
			"Manufacturer": "Alpha Letters",
			"Contents": "Alphabets Letters",
			"Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.",
			"ImageUrl": "http://localhost:5000/product-images/c.jpg",
			"OrgPrice": 6,
			"Price": 6
		}, {
			"Id": "4",
			"Title": "Product D",
			"Category": "Alphabet Letter",
			"SubCategory": "Letters",
			"Manufacturer": "Alpha Letters",
			"Contents": "Alphabets Letters",
			"Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.",
			"ImageUrl": "http://localhost:5000/product-images/d.jpg",
			"OrgPrice": 60,
			"Price": 60
		}, {
			"Id": "5",
			"Title": "Product E",
			"Category": "Alphabet Letter",
			"SubCategory": "Letters",
			"Manufacturer": "Alpha Letters",
			"Contents": "Alphabets Letters",
			"Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.",
			"ImageUrl": "http://localhost:5000/product-images/e.jpg",
			"OrgPrice": 10,
			"Price": 10
		}).then((u) => {
            user = u;
            done();
        })

        Discount.create({
            "product_id": 3,
            "product_qty": 3,
            "discount": 10
        },
        {
            "product_id": 1,
            "product_qty": 3,
            "discount": 5
        },
        {
            "product_id": 2,
            "product_qty": 2,
            "discount": 1
        }).then((u) => {
            user = u;
            done();
        })
    });

    beforeEach((done) => {
        clearDatabase(() => {
            sandbox = sinon.sandbox.create();
            done();
        });
    });

    afterEach((done) => {
        sandbox.restore();
        done();
    });

    describe('### GET /api/get-all-products', () => {
        it('should return the all the products successfully', (done) => {
            request(app)
                .get('/api/get-all-products')
                .send()
                .expect(httpStatus.OK)
                .then(res => {
                    expect(res.body.staus).to.be.truthy;
                    expect(res.body.data).to.be.an('array');
                    done();
                });
        });
    });

    describe('### POST /api/add-to-cart', () => {
        it('should add product to cart', (done) => {
            request(app)
                .post('/api/add-to-cart')
                .send({
                    user: user._id,
                    description: 'this is a test task'
                })
                .expect(httpStatus.OK)
                .then(res => {
                    expect(res.body.user).to.equal(user._id.toString());
                    expect(res.body.description).to.equal('this is a test task');
                    expect(res.body._id).to.exist;
                    done();
                });
        });
    });

    describe('### PUT /delete-from-cart', () => {
        it('should delete product from cart', (done) => {
            request(app)
                .post('/api/delete-to-cart')
                .send({
                    user: user._id,
                    description: 'this is a test task'
                })
                .expect(httpStatus.OK)
                .then(res => {
                    expect(res.body.user).to.equal(user._id.toString());
                    expect(res.body.description).to.equal('this is a test task');
                    expect(res.body._id).to.exist;
                    done();
                });
        });
    });
});