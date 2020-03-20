const bcrypt    = require('bcryptjs');
const bv        = require('bvalid');
const salt_val  = 10;
function Crypt(){}

Crypt.prototype.encode = function(password,cb)
{
    if(bv.isFunction(cb)){
        bcrypt.genSalt(salt_val, function(err, salt) {
            if(err){return cb(err)}
            bcrypt.hash(password, salt, function(err, hash) {
                return cb(err,hash);
            });
        });
    } else {
        var salt = bcrypt.genSaltSync(salt_val);
        return bcrypt.hashSync(password, salt);
    }
};

Crypt.prototype.decode = function(password,hash,cb)
{
    if(bv.isFunction(cb)){
        bcrypt.compare(password, hash, function(err, res) {
            return cb(err,res);
        });
    } else {
        return bcrypt.compareSync(password, hash);
    }
}

module.exports = new Crypt();