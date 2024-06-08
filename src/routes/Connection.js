const mongoose = require('mongoose');
require("dotenv").config();


const uri = 'mongodb+srv://root:vipinroot@cluster0.oovckw5.mongodb.net/sabjiwaala';

mongoose.connect(uri)
    .then(() => {
        console.log("connetion successful")
    }).catch((e) => {
        console.log('Error: ', e);
    })

