var express = require('express');
var logger = require('morgan');
var cors = require('cors')
var mongoose = require('mongoose')

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require("./routes/products")
var authRouter = require('./routes/auth')
var cartsRouter = require('./routes/carts')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('trust proxy', 1);
app.enable('trust proxy');

app.use(
    cors({
      origin: [process.env.REACT_APP_URI]  // <== URL of our future React app
    })
  );


app.use('/users', usersRouter);
app.use('/products', productsRouter)
app.use('/auth', authRouter)
app.use('/carts', cartsRouter)

mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

module.exports = app;