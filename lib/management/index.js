"use strict";
const routes = require("./routes");

exports.register = function (server, options, next){
	let api = server.select("api");
	api.route(routes);
    next();
};

exports.register.attributes = {
    name: "management",
    version: "0.1.0"
};