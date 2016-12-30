"use strict";

const fs = require('fs');

// Nets
exports.getListNets = (request, reply) => {
	let page = request.query.page;
	let perPage = request.query.perPage;

	let Net = request.getDb("brainTrainDb").getModel("net");
	let condition = { 
		offset: (page - 1) * perPage,
		limit: perPage
	};
	Net.findAll(condition).then((nets) => {
		reply(nets);
	});
};

exports.createNet = (request, reply) => {
	let Net = request.getDb("brainTrainDb").getModel("net");
	let data = request.payload;
	data.applicationId = request.auth.credentials.applicationId;
	Net.create(data).then((net) => {
		reply(net).created("/nets/" + net.get("id"));
	});
};

exports.getNet = (request, reply) => {
	let Net = request.getDb("brainTrainDb").getModel("net");
	let condition = {
		where: {
			id: request.params.id
		}
	};
	Net.findAll(condition).then((net) => {
		reply(net);
	});
};

exports.updateNet = (request, reply) => {
	let Net = request.getDb("brainTrainDb").getModel("net");
	let data = request.payload;
	data.applicationId = request.auth.credentials.applicationId;
	let condition = {
		where: {
			id: request.params.id
		}
	};
	Net.update(data, condition).then((net) => {
		reply(net);
	});
};

exports.deleteNet = (request, reply) => {
	let Net = request.getDb("brainTrainDb").getModel("net");
	let condition = {
		where: {
			id: request.params.id
		}
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
	let conditions = {
		where: {
			id: request.params.id
		}
	};
	Application.findAll(conditions).then((application) => {
		reply(application);
	});
};

exports.updateApplication = (request, reply) => {
	let Application = request.getDb("brainTrainDb").getModel("application");
	let conditions = {
		where: {
			id: request.params.id
		}
	};
	Application.update(request.payload, conditions).then((application) => {
		reply(application);
	});
};

exports.deleteApplication = (request, reply) => {
	let Application = request.getDb("brainTrainDb").getModel("application");
	let conditions = {
		where: {
			id: request.params.id
		}
	};
	Application.destroy(conditions).then(() => {
		reply(true);
	});
};