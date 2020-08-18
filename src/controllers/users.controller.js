const passport = require('passport')
const User = require('../models/user');

const controller = {};
const errors = []

controller.renderRegister = (req, res, next) => {
    res.render('users/singup', {errors})
};

controller.register = async (req, res, next) => {
    console.log(req.body);

    const { username, email, password, confirm_password } = req.body;
    if(username.length <= 0 ) {
        errors.push({text: 'Introduzca datos!'})
    }
    if(password !== confirm_password) {
        errors.push({text: 'Las contraseñas no coinciden'});
    }
    if(password.length < 4) {
        errors.push({text: 'La contraseña debe tener mínimo 4 caracteres'});
    }
    if(errors.length > 0) {
        res.render('users/singup', {
            errors,
            username,
            email,
            password,
            confirm_password
        })
    } else {
        
        const user = await User.findOne({email: email});
        if (user) {
            req.flash('SingUpMessage', 'The email already exists.');
            res.redirect('/users/singup');
        } else {
            const newUser = new User();
            newUser.username = username;
            newUser.email = email;
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success', 'registro exitoso')
            res.redirect('/users/singin');
        }

    }


}


controller.renderLogin = (req, res, next) => {
    res.render('users/singin');
};

controller.login = passport.authenticate('local-singin', {
    successRedirect: '/tasks',
    failureRedirect: '/users/singin',
    passReqToCallback: true
});

controller.logout = (req, res, next) => {
    req.logout(); 
    res.redirect('/');
};

module.exports = controller;