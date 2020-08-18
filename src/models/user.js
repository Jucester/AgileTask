const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    date: { 
        type: Date, 
        default: Date.now
    },
    team_tasks: {
        type: Array
    }
 
});

// Encriptar contraseña
userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// Comparar contraseña
userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users', userSchema);
