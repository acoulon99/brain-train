"use strict";
const handlers = require("./handlers");
const NOT_IMPLEMENTED = "Not yet implemented";

module.exports = [
    {
        method: "GET",
        path: "/nets",
        config: {
            handler: handlers.getListNets
        }
    },
    {
        method: "POST",
        path: "/nets",
        config: {
            handler: (request, reply) => {
                reply(NOT_IMPLEMENTED);
            }
        }
    },
    {
        method: "PUT",
        path: "/nets/{id}",
        config: {
            handler: (request, reply) => {
                reply(NOT_IMPLEMENTED);
            }
        }
    }
];