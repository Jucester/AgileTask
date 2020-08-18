const passport = require('passport');
const local = require('passport-local').Strategy;

const User = require('../models/user')
 
// Serializar para mantener la sessión usando el id luego de la authentication
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local-singin', new local({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    
    const user = await User.findOne({email: email});

    if (!user) {
        return done(null, false, req.flash('SingInMessage', 'No user found'));
    }
 
    if (!user.validatePassword(password)) {
        return done(null, false, req.flash('SingInMessage', 'Incorrect Password'));
    }

    req.flash('success', `Bienvenido, ${user.username}`);
    done(null, user);
}));