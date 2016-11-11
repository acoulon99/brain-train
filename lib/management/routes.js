"use strict";
const handlers = require("./handlers");
const Joi = require("joi");

const netValidation = Joi.object().keys({
    label: Joi.string().max(255).description("net name"),
    description: Joi.string().description("description, notes, etc."),
    tensors: Joi.array().items(Joi.array()).description("list of n-dimensional matricies")
});

const paginationValidation = Joi.object().keys({
    page: Joi.number().min(1).default(1).description("page number"),
    perPage: Joi.number().min(1).max(100).default(10).description("objects per page")
});

const netIdValidation = Joi.object().keys({
    id: Joi.string().uuid().description("Net ID (UUID)")
});

module.exports = [
    {
        method: "GET",
        path: "/nets",
        config: {
            handler: handlers.getListNets,
            description: "Get List of Nets",
            notes: "Returns a list of neural nets",
            tags: ['api'],
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
            description: "Save Net",
            notes: "Saves a neural net",
            tags: ['api'],
            validate: {
                payload: netValidation
            }
        }
    },
    {
        method: "GET",
        path: "/nets/{id}",
        config: {
            handler: handlers.getNet,
            description: "Get Net",
            notes: "Returns a single neural net",
            tags: ['api'],
            validate: {
                params: netIdValidation
            }
        }
    },
    {
        method: "PUT",
        path: "/nets/{id}",
        config: {
            handler: handlers.updateNet,
            description: "Update Net",
            notes: "Updates a single neural net",
            tags: ['api'],
            validate: {
                params: netIdValidation,
                payload: netValidation
            }
        }
    },
    {
        method: "DELETE",
        path: "/nets/{id}",
        config: {
            handler: handlers.deleteNet,
            description: "Delete Net",
            notes: "Deletes a saved neural net",
            tags: ['api'],
            validate: {
                params: netIdValidation
            }
        }
    }
];