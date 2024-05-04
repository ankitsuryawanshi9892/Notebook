const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const {ObjectId} = mongoose.Schema.Types

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    likes:[{type:ObjectId,ref:"user"}],
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },
    uid: {
        type: String,
        required: true
    },
    file: {
        filename: String,
        path: String
    },
    comments: [{
        text: String,
        postedBy: String,
        timestamp : {
            type:Date,
            default:Date.now
        }
    }]

});

module.exports = mongoose.model('notes', NotesSchema);
