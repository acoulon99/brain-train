"use strict";

module.exports = function(sequelize, DataTypes){
	return sequelize.define("application", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		key: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			unique: true,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},{
		freezeTableName: true,
		classMethods: {
			associate: function(Models){
				return this.hasMany(Models.net);
			}
		}
	});
};