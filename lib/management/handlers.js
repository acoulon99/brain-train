"use strict";

const fs = require('fs');

// Nets
exports.getListNets = (request, reply) => {
	let page = request.query.page;
	let perPage = request.query.perPage;
	let appKey = request['headers']['application-key'];

	let Net = request.getDb("brainTrainDb").getModel("net");

	let condition = { 
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
	let Net = request.getDb("brainTrainDb").getModel("net");
	let Application = request.getDb("brainTrainDb").getModel("application");

	let application = request.application;

	let net = {
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
	let Net = request.getDb("brainTrainDb").getModel("net");
	let Application = request.getDb("brainTrainDb").getModel("application");

	let application = request.application;

	let condition = {
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
	let Net = request.getDb("brainTrainDb").getModel("net");
	let Application = request.getDb("brainTrainDb").getModel("application");
	let application = request.application;

	let net = {
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
	let Net = request.getDb("brainTrainDb").getModel("net");
	let Application = request.getDb("brainTrainDb").getModel("application");
	let application = request.application;

	let condition = {
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

// Applications
exports.getListApplications = (request, reply) => {
	let page = request.query.page;
	let perPage = request.query.perPage;

	let Application = request.getDb("brainTrainDb").getModel("application");
	let conditions = { 
		offset: (page - 1) * perPage,
		limit: perPage
	};
	Application.findAll(conditions).then((applications) => {
		reply(applications);
	});
};

exports.createApplication = (request, reply) => {
	let Application = request.getDb("brainTrainDb").getModel("application");
	Application.create(request.payload).then((application) => {
		reply(application).created("/applications/" + application.get("id"));
	}, (error) => {
		console.error(error);
		reply(error);
	});
};

exports.getApplication = (request, reply) => {
	let Application = request.getDb("brainTrainDb").getModel("application");
	let application = request.application;

	let conditions = {
		where: {
			id: application.get("id")
		}
	};
	Application.findAll(conditions).then((application) => {
		reply(application);
	});
};

exports.updateApplication = (request, reply) => {
	let Application = request.getDb("brainTrainDb").getModel("application");
	let application = request.application;

	let updatedApplication = {
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
	let Application = request.getDb("brainTrainDb").getModel("application");
	let application = request.application;

	let conditions = {
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