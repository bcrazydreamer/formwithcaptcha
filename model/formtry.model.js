const mongoose             = require('mongoose');
const ModelSchama          = mongoose.Schema(
    {
        /**
         * ip address
         */
        "i"     : {
                    type : String,
                    trim: true,
                    required : false
        },

        /**
         * user agent
         */
        "ua"    : {
                    type : String,
                    trim : true,
                    required : false
        },
        
        /**
         * timestamp
         */
        "ts"    : {
                    type : Number,
                    default : new Date().getTime()
        },

        /**
         * Act false denote delete
         * We can't delete any thing from database
         */
        "act"   : {
                    type : Boolean,
                    default : true
        }
    },{
        timestamps : true
    }
);

ModelSchama.index({i : 1, act : 1});

module.exports = mongoose.model("formtry",ModelSchama);