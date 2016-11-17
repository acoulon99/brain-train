"use strict";

module.exports = (sequelize, DataTypes) => {
	return sequelize.define("application", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		key: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
		name: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING
		}
	},{
		freezeTableName: true
	});
};