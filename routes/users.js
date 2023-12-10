const mongoose = require('mongoose');
const plm=require("passport-local-mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/pintrest")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    
  }, 
  posts: [{
   type:mongoose.Schema.Types.ObjectId,
   ref:'Post'
  }],
  dp: {
    type: String, // You might want to store the URL or file path of the user's profile picture
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    // lowercase: true,
  },
  fullName: {
    type: String,

    trim: true,
  },
});

userSchema.plugin(plm)

module.exports = mongoose.model('User', userSchema);

