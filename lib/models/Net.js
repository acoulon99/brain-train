"use strict";

module.exports = (sequelize, DataTypes) => {
	return sequelize.define("net", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		timestamp: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: false,
			validate: {
				notNull: true,
				isDate: true
			}
		},
		label: {
			type: DataTypes.STRING
		},
		description: {
			type: DataTypes.TEXT
		},
		tensors: {
			type: DataTypes.JSON
		}
	},{
		freezeTableName: true
	});
};