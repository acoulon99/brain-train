"use strict";

const sequelizeConfig = require("./config").sequelize;
const Sequelize = require('sequelize');

module.exports = {
    server: {},
    connections: [
        {
            port: 8080,
            labels: ["api"]
        }
    ],
    registrations: [
        {
            plugin: "./management",
            options: {
                select: ["api"],
                routes: {
                    prefix: "/management"
                }
            }
        },
        {
        	plugin: {
        		register: "hapi-sequelize",
        		options: [{
	    			name: "brainTrainDb",
	    			models: ["./models/**/*.js"],
	    			sequelize: new Sequelize(
	    				sequelizeConfig.database, 
	    				sequelizeConfig.username, 
	    				sequelizeConfig.password,
	    				sequelizeConfig.options
	    			),
	    			sync: true
        		}]
        	}
        }
    ]
};