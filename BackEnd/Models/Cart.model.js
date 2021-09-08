const mongoose = require("mongoose");
const {User} = require('../Models/User.model.js');

const CartSchema = new mongoose.Schema({
  userID: String,
  id:String,
  name: String, 
  image: String,
  price: Number,
  material:String,
  brand:String,
  inStock:Boolean,
  fastDelivery:Boolean,
  ratings:Number,
  offer:String,
  idealFor:String,
  level:String,
  color:String,
  quantity:Number
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = { Cart }