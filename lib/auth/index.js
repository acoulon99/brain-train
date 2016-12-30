'use strict';
const handlers = require('./handlers');

exports.register = function (server, options, next) {
	let api = server.select('api');
    api.auth.strategy('application-token', 'bearer-access-token', { validateFunc: handlers.applicationToken });
    next();
};

exports.register.attributes = {
    name: "authentication",
    version: "0.5.0"
};