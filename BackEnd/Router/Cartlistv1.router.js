const express = require('express');
const router = express.Router();
const Data = require('../Data/data.js');
const { Cart } = require('../Models/Cart.model.js');
const jwt = require('jsonwebtoken');
const mySecret = process.env['Secret'];

router.route('/')
.get(async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, mySecret);
    const allCartProduct = await Cart.find({});
    const cartProduct = allCartProduct.filter((cartProd) => cartProd.userID === decoded.id)
    res.json({ success: true, cartProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: "unable to get products", errorMessage: err.message });
  }
})
.post(async(req, res) => {
  try{
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, mySecret);
    const cartItem = req.body;
    const NewCart = new Cart({ ...cartItem.product, userID: decoded.id });
    const savedCart = await NewCart.save();
    const cartProduct = await Cart.find({});
    res.json({success: true, cart: cartProduct})
  }
  catch(err){
    res.status(500).json({success:false, message: "unable to add products in cart", errorMessage: err.message});
  }
})
.delete(async(req, res) => {
    try {
      const {productId} = req.body;
      await Cart.findByIdAndDelete(productId)
      const cartProduct = await Cart.find({});
      res.status(200).json({ success: true, message: "Deleted successfully", cartProduct});
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to delete item from cart", errorMessage: error.message });
    }
})

router.route('/cartUpdate')
.post(async(req, res) => {
  try {
      const {productId, quantity} = req.body;
      await Cart.findOneAndUpdate( {id:productId},{"quantity":quantity} )
      const cartItem = await Cart.find({})
      res.status(200).json({success: true, message: "updated successfully",cartItem})
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to update item in cart", errorMessage: error.message });
    }
})

module.exports = router;