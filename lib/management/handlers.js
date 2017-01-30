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
			net.set("applicationId", application.get("id"));
			reply(net).created("/nets/" + net.get("id"));
		});
	});
};

exports.getNet = (request, reply) => {
	let Net = request.getDb("brainTrainDb").getModel("net");
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

	Net.findAll(condition).then((net) => {
		reply(net);
	});
};

exports.updateNet = (request, reply) => {
	let Net = request.getDb("brainTrainDb").getModel("net");
	let application = request.application;

	let net = {
		name: request.payload['name'],
		version: request.payload['version'],
		description: request.payload['description'],
		applicationId: application.get("id")
	};

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

	Net.update(net, condition).then((net) => {
		reply(net);
	});
};

exports.deleteNet = (request, reply) => {
	let Net = request.getDb("brainTrainDb").getModel("net");
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

	Net.destroy(condition).then(() => {
		reply(true);
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

	let conditions = {
		where: {
			id: application.get("id")
		}
	};
	Application.update(request.payload, conditions).then((application) => {
		reply(application);
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
	Application.destroy(conditions).then(() => {
		reply(true);
	});
};