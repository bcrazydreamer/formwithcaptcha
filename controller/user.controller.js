const bv                = require('bvalid');
const mongo             = require('../service').Mongo;
const {to,crypt}        = require('../utility');


exports.createUser = async (req,res,next)=>{
    var body = req.body;
    function invalid(err){
        var ermsg = {
            err : err,
            body : req.body,
            path : req.path
        };
        req.logger.error(ermsg,"api_route")
        res.sendError(res,err)
    }
    
    var ob = {};
    if(bv.isEmail(body.email) === false){
        return invalid("invalid_email");
    }
    ob.e = body.email.toLowerCase();

    if(
        (bv.isString(body.name) === false) ||
        (bv.isString(body.name) && (body.name.trim().length === 0))
    ){
        return invalid("invalid_name");
    }
    ob.nm = body.name;

    if(bv.isString(body.password) === false) return invalid("invalid_password");
    if(body.password.length < 6) return invalid("password_small");
    if(bv.isAlphanumeric(body.password) === false) return invalid("password_alpha_num");
    ob.pd = crypt.encode(body.password);

    var [err,check] = await to(mongo.Model("user").findOne({ e : ob.e, act : true}));
    if(err) return invalid("server_error");
    if(check) return invalid("email_taken");

    var [err,create] = await to(mongo.Model("user").insert(ob));
    if(err) return invalid("server_error");

    var [err,createFormTry] = await to(mongo.Model("formtry").insert({i : req.clientIp,ua : req.customUserAgent}));
    
    delete ob.pd;
    
    res.sendSuccess(res,{msg : "User Created",data : ob});
}