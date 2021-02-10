const httpStatus = require('http-status');
const expect = require('chai').expect;
const request = require('supertest');
const conn = require('../config/db');
const app = require('../app');


describe('## Tasks API Tests', () => {
    before((done) => {
        conn.connect()
            .then(() => done())
            .catch((err) => done(err));
    })

    after((done) => {
        conn.close()
            .then(() => done())
            .catch((err) => done(err));
    })

    describe('### GET /api/products', () => {
        it('should return the all the products successfully', (done) => {
            request(app)
                .get('/api/products')
                .send()
                .expect(httpStatus.OK)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('### POST /api/total', () => {
        it('should give total amount', (done) => {
            request(app)
                .post('/api/total')
                .send([{
                    count: 1,
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.",
                    id: 1,
                    image: "http://localhost:5000/product-images/a.jpg",
                    price: 7,
                    title: "Product A",
                }])
                .expect(httpStatus.OK)
                .then(res => {
                    expect(res.body.total).to.equal(7);
                    done();
                });
        });
    });

    describe('### POST /api/orders', () => {
        it('should save an order', (done) => {
            request(app)
                .post('/api/orders')
                .send({
                    "cartItems": [{
                        "id": 1,
                        "title": "Product A",
                        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.",
                        "price": 7,
                        "image": "http://localhost:5000/product-images/a.jpg",
                        "count": 1
                    }, {
                        "id": 2,
                        "title": "Product B",
                        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.",
                        "price": 5,
                        "image": "http://localhost:5000/product-images/b.jpg",
                        "count": 1
                    }, {
                        "id": 3,
                        "title": "Product C",
                        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.",
                        "price": 7,
                        "image": "http://localhost:5000/product-images/c.jpg",
                        "count": 1
                    }]
                })
                .expect(httpStatus.OK)
                .then(res => {
                    expect(res.body.total).to.equal(19);
                    done();
                });
        });
    });
});