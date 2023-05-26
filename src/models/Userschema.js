const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    name: String,
    phone_no: String,
    email: String,
    password: String,
    cart: [{ product_id: String, quantity: Number }],
    order: [{ order_id: String, status: String }],
    address: [{ name: String, landmark: String, city: String, pincode: Number, state: String, phone_no: Number}]
})

const User = mongoose.model('User', Schema)

module.exports = User;