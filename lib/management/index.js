"use strict";
const routes = require("./routes");

exports.register = (server, options, next) => {
	let api = server.select("api");
	api.route(routes);
    next();
};

exports.register.attributes = {
    name: "management",
    version: "0.5.0"
};