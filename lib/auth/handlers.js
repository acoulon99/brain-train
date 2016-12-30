"use strict";

/**
 * Application Key
 */
exports.applicationKey = function(applicationKey, next){
    if(applicationKey){
        let credentials = {
            applicationKey: applicationKey
        };
        let meta = {
            isTheBestApp: true
        };
        next(null, true, credentials, meta);
    }
    else {
        next(null, false, credentials, meta);
    }
};