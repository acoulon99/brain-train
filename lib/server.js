"use strict";
const Glue = require("glue");
const config = require("./config");
const manifest = require("./manifest");

Glue.compose(manifest, config.glueComposeOptions, (err, server) => {
	if(err){
		throw err;
	}
	let models = server.plugins["hapi-sequelize"]["brainTrainDb"].getModels();
	console.log("models", models);
	let Net = models.net;
	let Application = models.application;
	console.log("Net", Net);
	console.log("Application", Application);
	Net.belongsTo(Application);

	server.plugins["hapi-sequelize"]["brainTrainDb"].sequelize



    server.start(() => {
        console.log(config.package.title + " Online!");
    });
});