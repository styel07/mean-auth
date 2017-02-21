const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

// Search and Return a User with a specific Id
module.exports.getUserById = function(id, callback) {
  User.fingById(id, callback);
};

// Search and Return a User by a specific Username
module.exports.getUserByUsername = function(username, callback) {
  const query = { username: username };
  User.findOne(query, callback);
};

// Encrypt User Password with bcrypt
module.exports.addUser = function(newUser, callback) {
  // Generate Salt
  bcrypt.genSalt(10, (err, salt) => {
    if(err) throw err;
    // Hashes then Saves the User Passoword
    bcrypt.hash(newUser.password, salt, (err,hash) => {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};
