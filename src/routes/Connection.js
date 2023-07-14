const mongoose = require('mongoose');
require("dotenv").config();


const uri = process.env.DBROOT || "mongodb://127.0.0.1:27017/sabjiwalla";

mongoose.connect(uri)
    .then(() => {
        console.log("connetion successful")
    }).catch((e) => {
        console.log('Error: ', e);
    })

