// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema = new mongoose.Schema({
    password: {type: String},
    name: {type: String},
    email: {type: String},
    phoneNumber: {type: String},
    bill: {type : Number}
})

module.exports = mongoose.model('User', UserSchema);
