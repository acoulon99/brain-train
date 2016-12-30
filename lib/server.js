"use strict";
const Glue = require("glue");
const config = require("./config");
const manifest = require("./manifest");

Glue.compose(manifest, config.glueComposeOptions, (err, server) => {
	if(err){
		throw err;
	}

	// setup model associations
	// adds applicationId to net table with foreign key
	let models = server.plugins["hapi-sequelize"]["brainTrainDb"].getModels();
	let Net = models.net;
	let Application = models.application;
	Net.belongsTo(Application); 

	// sync database with models (create any missing tables)
	let db = server.plugins["hapi-sequelize"]["brainTrainDb"].sequelize;
	db.sync();

	// Pre Response - function called after each handler
	server.ext('onPreResponse', function (request, reply) {
	    var response = request.response;
	    console.log('response', response);
	    return reply.continue();
	});

    server.start(() => {
        console.log(config.package.title + " Online!");
    });
});