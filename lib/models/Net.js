"use strict";

module.exports = (sequelize, DataTypes) => {
	return sequelize.define("net", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING
		},
		version: {
			type: DataTypes.STRING,
			unique: true
		},
		description: {
			type: DataTypes.TEXT
		}
	},{
		freezeTableName: true
	});
};