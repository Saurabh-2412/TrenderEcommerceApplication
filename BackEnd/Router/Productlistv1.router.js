const express = require('express');
const router = express.Router();
const Data = require('../Data/data.js');
const { Cart } = require('../Models/Cart.model.js');

router.route('/')
.get(async(req,res) =>{
  try {
    res.json(Data);
  } catch(err){
    res.status(500).json({success:false, message: "unable to Load products", errorMessage: err.message});
  }
})

module.exports = router;