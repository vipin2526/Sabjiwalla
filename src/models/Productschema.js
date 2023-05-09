const mongoose =require('mongoose')
const Schema =new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    image_url:String,
    discription:String
})

const Product =mongoose.model('product',Schema);

module.exports=Product;