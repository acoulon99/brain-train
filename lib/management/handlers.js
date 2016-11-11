"use strict";
exports.getListNets = (request, reply) => {
	let page = request.query.page;
	let perPage = request.query.perPage;

	let Net = request.getDb("brainTrainDb").getModel("net");
	Net.findAll({ 
		offset: (page - 1) * perPage,
		limit: perPage
	}).then((nets) => {
		reply(nets);
	});
};

exports.createNet = (request, reply) => {
	let Net = request.getDb("brainTrainDb").getModel("net");
	Net.create(request.payload).then((net) => {
		reply(net).created("/nets/" + net.get("id"));
	});
};

exports.getNet = (request, reply) => {
	let Net = request.getDb("brainTrainDb").getModel("net");
	Net.findAll({
		where: {
			id: request.params.id
		}
	}).then((net) => {
		reply(net);
	});
};

exports.updateNet = (request, reply) => {
	let Net = request.getDb("brainTrainDb").getModel("net");
	Net.update(request.payload, {
		where: {
			id: request.params.id
		}
	}).then((net) => {
		reply(net);
	});
};

exports.deleteNet = (request, reply) => {
	let Net = request.getDb("brainTrainDb").getModel("net");
	Net.destroy({
		where: {
			id: request.params.id
		}
	}).then(() => {
		reply(true);
	});
};