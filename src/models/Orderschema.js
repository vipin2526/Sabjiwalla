const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    user_id: String,
    order_id: String,
    username: String,
    phone_no: Number,
    items_name: String,
    items: [{ product_id: String, quantity: Number, _id: String }],
    address_obj: {},
    paymentmethod: String
})

const Order = mongoose.model('Order', Schema)

module.exports = Order;