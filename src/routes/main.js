require('./Connection')
const User = require('../models/Userschema')
const Product = require('../models/Productschema')
const Order = require('../models/Orderschema')
const routes = require('express').Router();
const bodyparser = require('body-parser')


routes.use(bodyparser.urlencoded({ extended: true }))
routes.use(bodyparser.json())


const islogin = async (req, res, next) => {
    req.param = req.cookies['_id'];
    if (req.param) {
        req.param = await User.findOne({ _id: req.param });
        next();
    }
    else {
        req.param = 0;
        next();
        // i will recheck this route
    }
}


routes.get('/', islogin, async (req, res) => {
    try {
        const user = req.param;
        const vegitables = await Product.find({ 'category': 'vegitable' });
        const fruits = await Product.find({ 'category': 'fruit' });
        // console.log(await Product.deleteOne({}));
        res.render('index', { vegitables, fruits, user });
    } catch (error) {
        console.log('Error : ', error);
    }
})

routes.get('/login', islogin, (req, res) => {
    res.render('login', { user: req.param });
})
routes.get('/registration', islogin, (req, res) => {
    res.render('registration', { user: req.param });
})
routes.get('/addproduct', islogin, (req, res) => {
    res.render('addproduct', { user: req.param });
})
routes.get('/orders', islogin, (req, res) => {
    res.render('orders', { user: req.param });
})
routes.get('/create_order', islogin, async (req, res) => {
    try {
        const cart_data = req.param.cart;
        let cart = [];
        for (const element of cart_data) {
            const product = await Product.findOne({ _id: element.product_id });
            cart.push(product);
        }
        res.render('create_order', { user: req.param, cart: cart });
    } catch (error) {
        console.log('Error : ', error);
    }

})
routes.get('/forget_password', (req, res) => {
    res.render('forget_password');
})
/// cart
routes.get('/cart', islogin, async (req, res) => {

    try {
        const user = await User.findOne({ _id: req.cookies['_id'] })
        if (!user) return res.redirect('/login');
        const cart_data = user.cart;
        let cart = [];

        for (const element of cart_data) {
            const product = await Product.findOne({ _id: element.product_id });
            cart.push(product);
        }
        res.render('cart', { user: req.param, cart });
    } catch (error) {
        console.log('Error : ', error);
    }
})

// all product
routes.get('/product', async (req, res) => {
    try {
        const product = await Product.find({});
        res.send(product);
    } catch (error) {
        console.log('Error : ', error);
    }
})

//signup route
routes.post('/signup', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.redirect('/login');
    }
    try {
        const user = new User(req.body);
        const usersave = await user.save();
        console.log(usersave);
        res.redirect('/login');
    } catch (error) {
        console.log(error);
    }
})
//login route
routes.post('/login', async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.findOne({ email: req.body.username });
        if (user && user.password == req.body.password) {
            res.cookie('_id', user._id);
            res.redirect('/');
        }
        else
            res.redirect('/login')
    } catch (error) {
        console.log('Error : ', error);
    }

})

routes.post('/cart', async (req, res) => {

    try {
        let data = req.body;
        const user = await User.findOne({ _id: req.cookies['_id'] })
        if (user) {
            user.cart.push({ product_id: data.product_id, quantity: data.quantity });
            const saveduser = await user.save();
            // console.log("add to cart  ", saveduser);
            res.send("product added into cart");
        }
        else
            res.send("User not found");
    } catch (error) {
        console.log('Error : ', error);
    }
})

routes.post('/remove', async (req, res) => {

    try {
        let data = req.body;
        const user = await User.findOne({ _id: req.cookies['_id'] })
        if (user) {
            user.cart.splice(data.index, 1)
            const saveduser = await user.save();
            res.send("product removed from cart");
        }
        else
            res.send("User not found");
    } catch (error) {
        console.log('Error : ', error);
    }
})
routes.post('/new_address', async (req, res) => {
    try {
        let address = req.body;
        console.log(address);
        const user = await User.findOne({ _id: req.cookies['_id'] })
        if (user) {
            user.address.unshift({ name: address.name, landmark: address.landmark, city: address.city, pincode: address.pincode, state: address.state, phone_no: address.phone_no });
            const saveduser = await user.save();
            // console.log("add to cart  ", saveduser);
            res.send("Address Added");
        }
        else
            res.send("User not found");
    } catch (error) {
        console.log('Error : ', error);
    }
})


routes.post('/create_order', islogin, async (req, res) => {
    try {
        const order = new Order(req.body);
        const ordersave = await order.save();
        if (ordersave) {
            res.send("Order Successfully Submitted");
            const user = await User.findOne({ _id: req.cookies['_id'] })
            if (user) {
                user.cart=[];
                user.save();
            }
        }

    } catch (error) {
        console.log('Error : ', error);
    }
})

// add prodcut



routes.post('/addproduct', async (req, res) => {
    try {
        let data = req.body;
        data.image_url = '/public/images/' + data.image_url + '.avif';
        const product = new Product(data);
        console.log(data);

        const productsave = await product.save();
        res.redirect('/addproduct')
    } catch (error) {
        console.log('Error : ', error);
    }
})



module.exports = routes; 