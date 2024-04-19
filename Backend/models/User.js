const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define your schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profession:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: '/images/user.png' // Default image path
    },
    date: {
        type: Date,
        default: Date.now
    },
});

// Create your model
const User = mongoose.model('User', UserSchema);

// Export your model
module.exports = User;
