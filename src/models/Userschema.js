const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    name: String,
    phone_no: String,
    email: String,
    password: String,
    cart: [{ product_id: String, quantity: Number }],
    order: [{ order_id: String, status: String}]
})

const User = mongoose.model('User', Schema)

module.exports = User;