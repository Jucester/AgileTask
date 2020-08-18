const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: false
    },
    user: {
        type: Array
    },
    key: {
        type: String
    },
    team: {
        type: Array
    }
});

module.exports = mongoose.model('tasks', taskSchema);