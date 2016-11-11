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
        	plugin: {
        		register: "hapi-sequelize",
        		options: [{
	    			name: "brainTrainDb",
	    			models: [sequelizeConfig.modelLocation],
	    			sequelize: new Sequelize(
	    				sequelizeConfig.database, 
	    				sequelizeConfig.username, 
	    				sequelizeConfig.password,
	    				sequelizeConfig.options
	    			),
	    			sync: true
        		}]
        	}
        },
        {
            plugin: "./management",
            options: {
                select: ["api"],
                routes: {
                    prefix: "/management"
                }
            }
        }
    ]
};