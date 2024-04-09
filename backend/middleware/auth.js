const jwt = require('jsonwebtoken');
const User = require('../models/User');
exports.checkSuperUserToken = async function(req,res,next){
    let token=getTokenFromReq(req);
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.superuser == "superuser"){
            req.isSuperUser=true;
        }
    }catch(err){
        // console.log(err)
    }
    finally{
        next();
    }
}
exports.checkTokenIfExists = async function(req,res,next){
    let token=getTokenFromReq(req);
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
    }catch(err){
        console.log(err)
    }
    finally{
        next();
    }
}
exports.checkToken = async (req,res,next) =>{
    let token=getTokenFromReq(req);

    if(!token) {
        return res.status(401).json({success: false, message: 'Not authorize to access this route'});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id);

        next();
    }catch(err){
        return res.status(401).json({success: false, message: 'Not authorize to access this route'});
    }
}
exports.checkRole=function(...roles){
    return function(req,res,next){
        if(roles.includes(req.user.role)){
            return next();
        }
        res.status(401).json({
            success:false,
            message:"Unauthorized"
        })
    }
}
function getTokenFromReq(req){
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}