const express = require('express');
const router = express.Router();
const Data = require('../Data/data.js');
const { Wishlist } = require('../Models/WishList.model.js');
const { Cart } = require('../Models/Cart.model.js');
const jwt = require('jsonwebtoken');
const mySecret = process.env['Secret'];

router.route('/')
.get(async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, mySecret);
    const allWishlistProduct = await Wishlist.find({});
    const WishlistProduct = allWishlistProduct.filter((wishProduct) => wishProduct.userID === decoded.id)
    res.status(200).json({ success: true, WishlistProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: "unable to load products from wishlist", errorMessage: err.message });
  }
})
.post(async(req, res) => {
  try{
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, mySecret);
    const wishItem = req.body;
    const NewWish = new Wishlist({...wishItem.product, userID:decoded.id});
    const savedWish = await NewWish.save();
    const wishlistProduct = await Wishlist.find({});
    res.json({success: true, wish: wishlistProduct})
  }
  catch(err){
    res.status(500).json({success:false, message: "unable to add products in wish", errorMessage: err.message});
  }
})
.delete(async(req, res) => {
  try{
    const {productId} = req.body;
    const wishItem = await Wishlist.findByIdAndDelete(productId);
    const wishProduct = await Wishlist.find({});
    res.status(200).json({ success: true, message: "Deleted successfully", wishProduct});
  }
  catch(err){
    res.status(500).json({success:false, message: "unable to add products in wish", errorMessage: err.message});
  }
})

router.route('/moveToCart')
.post(async(req, res) => {
  try{
    const {productId} = req.body;
    const wishItem = await Wishlist.findByIdAndDelete(productId)
    const wishProduct = await Wishlist.find({});
    res.status(200).json({ success: true, message: "updated successfully", wishProduct});
  }
  catch(err){
    res.status(500).json({success:false, message: "unable to add products in wish", errorMessage: err.message});
  }
})

module.exports = router;