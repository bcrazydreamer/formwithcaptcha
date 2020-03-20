const errors 	= require('../helper').errors;

module.exports = {
	sendError : function(res,err,code=500) {
		var erob = errors[err];
		if(erob){
			err = erob[1],
			code = erob[0]
		}
		return res.status(code).json({
			code 	: code,
			message : err,
			success : false
		});
	},
	sendSuccess : function(res,data=200) {
		return res.status(200).json({
			success : true,
			data	: data
		});
	}
};