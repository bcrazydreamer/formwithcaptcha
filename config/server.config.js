try{ var ow = require('./server_overwrite.config')}
catch(err){ var ow = {}}

var conf = {
    "recaptcha_site_key" : "",
    "recaptcha_secret_key" : "",
    "JWT_PRIVATE_KEY" : "its_top_secret"
}

module.exports = {...conf,...ow}