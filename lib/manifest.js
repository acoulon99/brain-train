"use strict";

const sequelizeConfig = require("./config").sequelize;
const pack = require("./config").package;
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

        // DB
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

        // Documentation
        {
            plugin: {
                register: "inert"
            }
        },
        {
            plugin: {
                register: "vision"
            }
        },
        {
            plugin: {
                register: "hapi-swagger",
                options: {
                    info: {
                        title: pack.title + " API",
                        version: pack.version
                    }
                }
            }
        },

        // Management API
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