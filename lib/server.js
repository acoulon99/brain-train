"use strict";
const Glue = require("glue");
const config = require("./config");
const manifest = require("./manifest");

Glue.compose(manifest, config.glueComposeOptions, (err, server) => {
	if(err){
		throw err;
	}
    server.start(() => {
        console.log(config.package.title + " Online!");
    });
});