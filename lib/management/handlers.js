"use strict";

const fs = require('fs');
const Boom = require('boom');
const config = require("../config");
const async = require("async");
const glob = require("glob");

// Nets
exports.getListNets = (request, reply) => {
	const page = request.query.page;
	const perPage = request.query.perPage;
	const appKey = request['headers']['application-key'];

	const Net = request.getDb("brainTrainDb").getModel("net");

	const condition = { 
		offset: (page - 1) * perPage,
		limit: perPage,
		include: [{
			model: Application,
			where: {
				key: appKey
			}
		}]
	};

	Net.findAll(condition).then((nets) => {
		reply(nets);
	});
};

exports.createNet = (request, reply) => {
	const Net = request.getDb("brainTrainDb").getModel("net");
	const Application = request.getDb("brainTrainDb").getModel("application");

	const application = request.application;

	const net = {
		name: request.payload['name'],
		version: request.payload['version'],
		description: request.payload['description']
	}

	Net.create(net).then((net) => {
		application.addNet(net).then((application) => {
			Net.findOne({
				where: {
					id: net.get("id")
				},
				include: [{
					model: Application,
					where: {
						id: application.get("id")
					}
				}]
			}).then((net) => {
				reply(net).created("/nets/" + net.get("id"));
			});
		});
	});
};

exports.getNet = (request, reply) => {
	const Net = request.getDb("brainTrainDb").getModel("net");
	const Application = request.getDb("brainTrainDb").getModel("application");

	const application = request.application;

	const condition = {
		where: {
			id: request.params.id
		},
		include: [{
			model: Application,
			where: {
				id: application.get("id")
			}
		}]
	};

	Net.findOne(condition).then((net) => {
		reply(net);
	});
};

exports.updateNet = (request, reply) => {
	const Net = request.getDb("brainTrainDb").getModel("net");
	const Application = request.getDb("brainTrainDb").getModel("application");
	const application = request.application;

	const net = {
		id: request.params.id,
		name: request.payload['name'],
		version: request.payload['version'],
		description: request.payload['description'],
		applicationId: application.get("id")
	};

	Net.upsert(net).then((created) => {
		Net.findOne({
			where: {
				id: net.id
			},
			include: [{
				model: Application,
				where: {
					id: application.get("id")
				}
			}]
		}).then((net) => {
			reply(net);
		});
	});
};

exports.deleteNet = (request, reply) => {
	const Net = request.getDb("brainTrainDb").getModel("net");
	const Application = request.getDb("brainTrainDb").getModel("application");
	const application = request.application;

	const condition = {
		where: {
			id: request.params.id
		},
		include: [{
			model: Application,
			where: {
				id: application.get("id")
			}
		}]
	};

	Net.destroy(condition).then((numAffected) => {
		if(numAffected === 1){
			reply(true);
		}
		else {
			reply(Boom.notFound("Could not locate net."));
		}
	});
};

exports.uploadNet = (request, reply) => {
	const Net = request.getDb("brainTrainDb").getModel("net");
	const Application = request.getDb("brainTrainDb").getModel("application");

	const file = request.payload.file;
	const filename = file.hapi.filename;
	const headers = file.hapi.headers;
	const parts = filename.split(".");
	
	if(parts[parts.length - 1] === "zip"){
		console.log(filename, headers);
		const application = request.application;

		async.waterfall([
			function verifyNet(callback){
				const condition = {
					where: {
						id: request.params.id
					},
					include: [{
						model: Application,
						where: {
							id: application.get("id")
						}
					}]
				};

				Net.findOne(condition).then((net) => {
					if(net){
						callback(null, net);
					}
					else {
						callback(Boom.badRequest("Could not find this net."));
					}
				});
			},
			function saveFile(net, callback){
				const name = application.get("id") + "_" + net.get("id") + ".zip";
                const path = config.uploads.directory + "/" + name;
                const localFile = fs.createWriteStream(path);

                localFile.on("error", function(err){
                	callback(Boom.badImplementation(err));
                });

                file.pipe(localFile);

                file.on("end", function(err){
                	net.set("file", config.host + "/management/nets/" + net.get("id") + "/files" + ".zip");
                	callback(null, net);
                });
			},
			function updateNetWithLocation(net, callback){
				const values = {
					file: net.get("file")
				};
				const options = {
					where: {
						id: net.get("id")
					},
					fields: ["file"]
				};
				Net.update(values, options).then((results) => {
					Net.findOne({
						where: {
							id: net.get("id")
						},
						include: [{
							model: Application,
							where: {
								id: application.get("id")
							}
						}]
					}).then((net) => {
						reply(net);
					});
				});
			}
		], function(err, net){
			if(err){
				reply(err);
			}
			else{
				reply(net);
			}
		});
	}
	else {
		reply(Boom.badRequest("Must upload a zip file"));
	}
}

exports.getNetFile = (request, reply) => {
	const Net = request.getDb("brainTrainDb").getModel("net");
	const Application = request.getDb("brainTrainDb").getModel("application");
	const application = request.application;

	const condition = {
		where: {
			id: request.params.id
		},
		include: [{
			model: Application,
			where: {
				id: application.get("id")
			}
		}]
	};

	Net.findOne(condition).then((net) => {
		if(net){
			const name = application.get("id") + "_" + net.get("id") + ".zip";
			const fileLocation = config.uploads.directory + "/" + name;
			const options = {
				filename: name,
				mode: 'attachment',
				etagMethod: 'simple' // use 'hash' for distributed file system
			};
			reply.file(fileLocation, options);
		}
		else {
			reply(Boom.badRequest("Could not find this net."));
		}
	});
}

// Applications
exports.getListApplications = (request, reply) => {
	const page = request.query.page;
	const perPage = request.query.perPage;

	const Application = request.getDb("brainTrainDb").getModel("application");
	const conditions = { 
		offset: (page - 1) * perPage,
		limit: perPage
	};
	Application.findAll(conditions).then((applications) => {
		reply(applications);
	});
};

exports.createApplication = (request, reply) => {
	const Application = request.getDb("brainTrainDb").getModel("application");
	Application.create(request.payload).then((application) => {
		reply(application).created("/applications/" + application.get("id"));
	}, (error) => {
		console.error(error);
		reply(error);
	});
};

exports.getApplication = (request, reply) => {
	const Application = request.getDb("brainTrainDb").getModel("application");
	const application = request.application;

	const conditions = {
		where: {
			id: application.get("id")
		}
	};
	Application.findAll(conditions).then((application) => {
		reply(application);
	});
};

exports.updateApplication = (request, reply) => {
	const Application = request.getDb("brainTrainDb").getModel("application");
	const application = request.application;

	const updatedApplication = {
		id: application.get("id"),
		name: request.payload['name'],
		email: request.payload['email']
	}

	Application.upsert(updatedApplication).then((created) => {
		Application.findOne({
			where: {
				id: application.get("id")
			}
		}).then((application) => {
			reply(application);
		});
	});
};

exports.deleteApplication = (request, reply) => {
	const Application = request.getDb("brainTrainDb").getModel("application");
	const application = request.application;

	const conditions = {
		where: {
			id: application.get("id")
		}
	};
	Application.destroy(conditions).then((numAffected) => {
		if(numAffected === 1){
			reply(true);
		}
		else {
			reply(Boom.notFound("Could not locate application."));
		}
	});
};