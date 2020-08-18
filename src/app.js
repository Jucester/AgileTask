const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const methodOverride = require('method-override');

// Initializations
const app = express();
require('./config/database')
require('./config/auth')

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Midlewares
app.use(morgan('dev'));
app.use(express.json())
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'node-login-system',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables

app.use((req, res, next) => {
    app.locals.singupMessage = req.flash('SingUpMessage');
    app.locals.singinMessage = req.flash('SingInMessage');
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
   
    app.locals.user = req.user || null;
    next();
});

// Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/tasks.routes'));
app.use(require('./routes/users.routes'));

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Initialize server
app.listen(app.get('port'), () => {
    console.log('Server on port: ', app.get('port'))
})

