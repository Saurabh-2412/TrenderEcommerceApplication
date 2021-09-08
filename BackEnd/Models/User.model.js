const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({ 
  name: String,
  password: String,
  mail: String,
  phone: Number
});

const User = mongoose.model("User", UserSchema);

module.exports = { User }