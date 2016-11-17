"use strict";

module.exports = (sequelize, DataTypes) => {
	let Net = sequelize.define("net", {
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
		freezeTableName: true,
		classMethods: {
			associate: (models) => {
				Net.belongsTo(models.Application);
			}
		}
	});
	return Net;
};