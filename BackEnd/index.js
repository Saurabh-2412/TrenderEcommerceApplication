const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
var jwt = require('jsonwebtoken');
const mySecret = process.env['Secret']

const AuthValidator = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, mySecret);
    req._id = decoded.id
    return next();
  } catch (error) {
    res.status(401).json({success: false, message: error.message})
  }
}

app.use(cors());
app.use(bodyParser.json());

const { dbInitilizer } = require('./DBConnector/DBInitilizer.js');
dbInitilizer();

const v1ProductRouter = require('./Router/ProductList.v1.router.js');
app.use("/v1/productData" ,cors() ,v1ProductRouter);

const v1CartRouter = require('./Router/CartList.v1.router.js');
app.use("/v1/cartData" , cors(), AuthValidator, v1CartRouter);

const v1WishlistRouter = require('./Router/WishList.v1.router.js');
app.use("/v1/wishlistData", cors(), AuthValidator, v1WishlistRouter);

const v1UserRouter = require('./Router/User.v1.router.js');
app.use("/v1/userData" ,cors() ,v1UserRouter);

app.get('',(req,res) => {
  res.send("Hello! Welcoming you to EXPRESS your world in express");
})

app.use((req, res) => {
  res.status(404).json({ success: false, message: "the route you're looking for couldn't be found status 404" })
})

app.use((err, req, res, next) => {
  res.status(500).json({ success: false, message: "the route you're looking for couldn't be found status 500", ErrorMessage: err.message })
})

app.listen(3000, () => {
  console.log('server started');
});