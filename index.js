const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const port = process.env.PORT || 3000;

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//import routes
const productsRoute = require('./routes/products');
const cartRoute = require('./routes/cart');
const authRoute = require('./routes/auth');
const wishRoute = require('./routes/wish');

app.use('/products', productsRoute);
app.use('/cart', cartRoute);
app.use('/auth', authRoute);
app.use('/wish', wishRoute );

//Routes
app.get('/', (req, res) => {
    res.send("We are on home")
})


//connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, ()=>console.log("Connected to DB"))

//Listening to the server
app.listen(port, ()=>console.log(`Server started at http://localhost:${port}/`));

