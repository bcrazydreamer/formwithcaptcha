const mongoose  = require('mongoose');
const logger    = require('./logger.utility');

var mongoOption = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};
const mongoUrl = "mongodb://" + "localhost" + ":" + "27017" + "/" + "jobassignment";

function connect(){
    return mongoose.connect(mongoUrl, mongoOption);
}

//On connect
mongoose.connection.on('connected', function () {
    var msg = 'Mongo connected with '+mongoUrl;
    logger.info(msg,"mongo");
    console.log(msg);
});

//on error
mongoose.connection.on('error',function (err) {
    var msg = 'Error occur in mongo '+ err;
    logger.info(err,"mongo");
    console.log(msg);
});

//On disconnected
mongoose.connection.on('disconnected', function () {
    var msg = 'Mongo connection disconnected';
    console.log(msg);
    logger.info(msg,"mongo");
    setTimeout(()=>{
        return connect();
    },3000)
});

module.exports = {
    connect : connect
}