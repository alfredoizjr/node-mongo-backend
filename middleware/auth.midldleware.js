var jwt = require('jsonwebtoken');
const KEY = require('../config/config').KEY;



exports.verifyToken = function(req,res,next) {

 jwt.verify(req.query.token,KEY,(err, decoded) => {
     if(err) {
        return res.status(401).json({
            message: 'Token error',
            status: '500',
            err
        });
     }else {
        req.user = decoded.user
         next();
     }
 })

}
