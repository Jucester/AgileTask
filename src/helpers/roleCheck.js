const helper = {};

helper.authRole = (req, res, next) => {
    console.log(req.body);
    console.log(req.user);
   
    next();
}

module.exports = helper;