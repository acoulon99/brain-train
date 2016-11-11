"use strict";
const sequelizeConfig = require("./config").sequelize;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
	sequelizeConfig.database, 
	sequelizeConfig.username, 
	sequelizeConfig.password, 
	sequelizeConfig.options
);

module.exports = sequelize;