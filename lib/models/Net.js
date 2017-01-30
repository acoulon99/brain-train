"use strict";

module.exports = function(sequelize, DataTypes) {
	return sequelize.define("net", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		version: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT
		},
		file: {
			type: DataTypes.STRING
		}
	},{
		freezeTableName: true,
		classMethods: {
			associate: function(Models){
				return this.belongsTo(Models.application);
			}
		},
		instanceMethods: {
			toJSON: function(){
				var values = Object.assign({}, this.get());
				delete values.applicationId;
				return values;
			}
		}
	});
};