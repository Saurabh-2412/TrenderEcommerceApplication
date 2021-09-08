const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const { User } = require('../Models/User.model.js');
const mySecret = process.env['Secret'];

router.route('/')
.get(async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, mySecret);
    const userId = req.body;
    const user = await User.find();
    const userData = user.filter((currentUser) => currentUser.mail === decoded.id);
    res.json({ success: true, userData });
  } catch (err) {
    res.status(500).json({ success: false, message: "unable to fetch users list", errorMessage: err.message });
  }
})
.post(async(req, res) => {
  try{
    const salt = await bcrypt.genSalt(10);
    const user = req.body;
    const encryptedPassword = await bcrypt.hash(user.password, salt);
    const NewUser = new User({...user, password: encryptedPassword});
    const savedUser = await NewUser.save();
    const UserRecord = await User.find({});
    res.status(200).json({success: true, message: "user added successfully",UserRecord});
  }
  catch(err){
    res.status(500).json({success:false, message: "unable to add user", errorMessage: err.message});
  }
})
.delete(async(req, res) => {
    try {
      const userId = req.body;
      const user = await User.findByIdAndRemove(userId);
      const userData = await User.find({});
      res.status(200).json({ success: true, message: "Deleted successfully", userData});
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to delete user", errorMessage: error.message });
    }
})

router.route('/:id')
.get(async (req, res) => {
  try {
    const {id} = req.params;
    const user = await User.find();
    const userData = user.filter((currentUser) => currentUser.mail === id);
    res.json({ success: true, userData });
  } catch (err) {
    res.status(500).json({ success: false, message: "unable to fetch users list", errorMessage: err.message });
  }
})
.post(async (req, res) => {
  try {
    const { userId, password } = req.body;
    var token = jwt.sign({ id: userId }, mySecret, {expiresIn:'24hr'});
    const userData = await User.find();
    const foundUser = userData.filter((user) => user.mail === userId)
    const result = bcrypt.compareSync( password, foundUser[0].password)
    if(result === true){
      console.log("valid password");
      res.status(200).json({ success: true, userData, token });
    } else {
      console.log("invalid password")	;
      res.status(401).json({ success: false, message: "Invalid password" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "unable to fetch users list", errorMessage: err.message });
  }
})

module.exports = router;