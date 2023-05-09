const mongoose = require('mongoose');

const uri ="mongodb+srv://root:root@cluster0.oovckw5.mongodb.net/sabjiwaala";
// const uri ="mongodb://127.0.0.1:27017/sabjiwalla";
mongoose.connect(uri)
    .then(() => {
        console.log("connetion successful")
    }).catch((e) => {
        console.log('Error: ', e);
    })

