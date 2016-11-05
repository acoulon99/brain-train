"use strict";
exports.getListNets = (request, reply) => {
	reply([{
		weights: [[1, 2], [3, 4]],
		bias: [[1, 1], [1, 1]]
	}]);
};