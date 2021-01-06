const jwt = require("jsonwebtoken");
const config = require('config');
module.exports = function (req,res,next) {
    if(!req.header('x-auth')) res.status(401).send('token is not available');

    try {
        const doc =jwt.verify(req.header('x-auth'), config.get('jwtKey'));
        req.user = doc;
        next();
    } catch (error) {
        res.status(400).send('token unvalid')
    }
}