"use strict";

const PROJECT_HOME = process.env.PROJECT_HOME || __dirname + "/..";

module.exports = {
	package: require("../package"),
	glueComposeOptions: {
		relativeTo: PROJECT_HOME + "/lib"
	},
	sequelize: {
		database: process.env.NODE_ENV || "dev",
		username: process.env.POSTGRES_USER || "vagrant",
		password: process.env.POSTGRES_PASS || "vagrant",
		modelLocation: PROJECT_HOME + "/lib/models/**/*.js",
		options: {
			dialect: "postgres",
			port: 5432,
			logging: false,
			host: process.env.POSTGRES_HOST || "127.0.0.1",
			pool: {

				// if running multiple processes, consider total max connections
				max: process.env.POSTGRES_POOL_MAX || 5,
				min: process.env.POSTGRES_POOL_MIN || 0,
				idle: process.env.POSTGRES_POOL_IDLE || 10000 // milliseconds
			}
		}
	}
};