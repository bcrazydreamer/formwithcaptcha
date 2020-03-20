const mongoose          = require('mongoose');
const bv                = require('bvalid');
const mongo             = require('../service').Mongo;
const jwt               = require('../utility/jwt.utility');
const Recaptcha         = require('recaptcha-verify');
const sConf             = require('../config').server;

var recaptcha = new Recaptcha({
    secret: sConf.recaptcha_secret_key,
    verbose: true
});

exports.loopAttack = (req,res,next)=>{
    var ua = req.customUserAgent;
    var ob = {ip : req.clientIp,ua : ua};
    var token = jwt.sign(ob,null,60 * 5);
    req.loopAttackToken = token;
    return next();
}

exports.verifyLookAttackToken = (req,res,next)=>{
    var body = req.body;
    var ua = req.customUserAgent;
    if(bv.isString(body.loop_at_tkn)){
        jwt.verify(body.loop_at_tkn,null,(err,decode)=>{
            if(err){
                return unauthError("form_session_expired");
            }
            if(bv.isObject(decode)=== false){
                return unauthError(); 
            }
            if((decode.ua === ua) && (decode.ip === req.clientIp)){
                return next();
            }
            return unauthError();
        })
    } else {
        return unauthError();
    }
    function unauthError(msg="unauthorised"){
        req.logger.error({msg : msg, body: req.body, path : req.path},"api_route");
        res.sendError(res,msg);
    }
}

exports.createUserAttamps = (req,res,next)=>{
    var dateOb = new Date();
    var d = dateOb.getDate();
    var m = dateOb.getMonth();
    var y = dateOb.getFullYear();
    var qdate = new Date(y,m,d);
    mongo.Model("formtry").find({
        i : req.clientIp,
        createdAt : {$gte : qdate},
        act : true
    },async (err,data)=>{
        if(err) return next(err);
        if(data.length >= 3){
            req.enblCaptcha = true;
            return next();
        }
        req.enblCaptcha = false;
        return next();
    })
}

exports.verifyCaptcha = (req,res,next)=>{
    var body = req.body;
    var captoken = body["g-recaptcha-response"];

    if(bv.isString(captoken)){
        if(captoken.length === 0){
            req.logger.error({msg : "captcha_verify_fail", body: req.body, path : req.path},"api_route");
            return res.sendError(res,"captcha_verify_fail",401);
        }
        recaptcha.checkResponse(body["g-recaptcha-response"], function(error, response){
            if(error){
                req.logger.error({msg : "server_error", body: req.body, path : req.path},"api_route");
                return res.sendError(res,"server_error");
            }
            if(response.success){
                return next();
            }else{
                req.logger.error({msg : "captcha_verify_fail", body: req.body, path : req.path},"api_route");
                return res.sendError(res,"captcha_verify_fail",401);
            }
        });
    } else {
        return next();
    }
}
