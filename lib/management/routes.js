"use strict";
const handlers = require("./handlers");
const Joi = require("joi");

const tensorValidation = Joi.object().keys({
    label: Joi.string().max(255),
    description: Joi.string(),
    tensors: Joi.array().items(Joi.array())
});

const paginationValidation = Joi.object().keys({
    page: Joi.number().min(1).default(1),
    perPage: Joi.number().min(1).max(100).default(10)
});

const tensorIdValidation = Joi.object().keys({
    id: Joi.string().uuid()
});

module.exports = [
    {
        method: "GET",
        path: "/nets",
        config: {
            handler: handlers.getListNets,
            validate: {
                query: paginationValidation
            }
        }
    },
    {
        method: "POST",
        path: "/nets",
        config: {
            handler: handlers.createNet,
            validate: {
                payload: tensorValidation
            }
        }
    },
    {
        method: "GET",
        path: "/nets/{id}",
        config: {
            handler: handlers.getNet,
            validate: {
                params: tensorIdValidation
            }
        }
    },
    {
        method: "PUT",
        path: "/nets/{id}",
        config: {
            handler: handlers.updateNet,
            validate: {
                params: tensorIdValidation,
                payload: tensorValidation
            }
        }
    },
    {
        method: "DELETE",
        path: "/nets/{id}",
        config: {
            handler: handlers.deleteNet,
            validate: {
                params: tensorIdValidation
            }
        }
    }
];