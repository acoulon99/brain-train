"use strict";

module.exports = sequelize.define("net", {
	id: {
		type: Sequelize.UUID,
		primaryKey: true
	},
	timestamp: {
		type: Sequelize.DATE,
		allowNull: false,
		defaultValue: Sequelize.NOW,
		validate: {
			notNull: true
		}
	},
	label: {
		type: Sequelize.STRING
	},
	weights: {
		type: Sequelize.TEXT
	},
	bias: {
		type: Sequelize.TEXT
	}
},{
	freezeTableName: true
});