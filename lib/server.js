"use strict";
const Glue = require("glue");
const config = require("./config");
const manifest = require("./manifest");
const Boom = require("boom");

Glue.compose(manifest, config.glueComposeOptions, (err, server) => {
	if(err){
		throw err;
	}

	// setup model associations
	// adds applicationId to net table with foreign key
	let Models = server.plugins["hapi-sequelize"]["brainTrainDb"].getModels();
	let Net = Models.net;
	let Application = Models.application;

	Application.associate(Models);
	Net.associate(Models);

	// sync database with models (create any missing tables)
	let db = server.plugins["hapi-sequelize"]["brainTrainDb"].sequelize;
	db.sync({force: true}).then(function(){
		server.ext('onPreHandler', function (request, reply) {
			if(request['headers']['application-key']){
				// lookup application here
				Application.findOne({
					where: {
						key: request['headers']['application-key']
					}
				}).then(function(application){
					if(application){
						request.application = application;
						return reply.continue();
					}
					else {
						return reply(Boom.notFound("Could not locate application."));					
					}
				});
			}
			else {
				return reply.continue();
			}
		});
	    server.start(() => {
	        console.log(config.package.title + " Online!");
	    });
	});
});