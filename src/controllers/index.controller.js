
const controller = {};

controller.renderIndex = (req, res, next) => {
    res.render('index')
};

controller.renderAbout = (req, res, next) => {
    res.render('about');
};

module.exports = controller;