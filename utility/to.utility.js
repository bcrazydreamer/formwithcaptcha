const {to} = require("await-to-js");
module.exports = async (promise) => {
    var [err,res] = await to(promise);
    if(err) return [err,null];
    return [null,res]
}