"use strict";
const handlers = require("./handlers");
const Joi = require("joi");

const VERSION_VALIDATOR = /(\d+\.)(\d+\.)(\d)/; // enforce MAJOR.MINOR.PATCH

const netValidation = Joi.object().keys({
    name: Joi.string().max(255).required().description("net name"),
    description: Joi.string().description("description, notes, etc."),
    version: Joi.string().regex(VERSION_VALIDATOR).description("version [ MAJOR.MINOR.PATCH ]")
});

const applicationValidation = Joi.object().keys({
    name: Joi.string().max(255).required().description("applicatin name"),
    email: Joi.string().email().required().description("contact and recovery email")
});

const paginationValidation = Joi.object().keys({
    page: Joi.number().min(1).default(1).description("page number"),
    perPage: Joi.number().min(1).max(100).default(10).description("objects per page")
});

const idValidation = Joi.object().keys({
    id: Joi.string().uuid().required().description("ID (UUID)")
});

const appKeyAuthValidation = Joi.object().keys({
    "application-key": Joi.string().uuid().required().description("application key")
}).options({ allowUnknown: true });

module.exports = [

    // Nets
    {
        method: "GET",
        path: "/nets",
        config: {
            handler: handlers.getListNets,
            description: "Get List of Nets",
            notes: "Returns a list of neural nets",
            tags: ['api'],
            validate: {
                query: paginationValidation,
                headers: appKeyAuthValidation
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
                payload: netValidation,
                headers: appKeyAuthValidation
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
                params: idValidation,
                headers: appKeyAuthValidation
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
                params: idValidation,
                payload: netValidation,
                headers: appKeyAuthValidation
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
                params: idValidation,
                headers: appKeyAuthValidation
            }
        }
    },

    // Application
    {
        method: "GET",
        path: "/applications",
        config: {
            handler: handlers.getListApplications,
            description: "Get List of Applications",
            notes: "Returns a list of applications",
            validate: {
                query: paginationValidation
            }
        }
    },
    {
        method: "POST",
        path: "/applications",
        config: {
            handler: handlers.createApplication,
            description: "Create Application",
            notes: "Creates an application",
            tags: ['api'],
            validate: {
                payload: applicationValidation
            }
        }
    },
    {
        method: "GET",
        path: "/applications/{id}",
        config: {
            handler: handlers.getApplication,
            description: "Get Application",
            notes: "Returns a single application",
            tags: ['api'],
            validate: {
                params: idValidation,
                headers: appKeyAuthValidation
            }
        }
    },
    {
        method: "PUT",
        path: "/applications/{id}",
        config: {
            handler: handlers.updateApplication,
            description: "Update Application",
            notes: "Updates a single application",
            tags: ['api'],
            validate: {
                params: idValidation,
                payload: applicationValidation,
                headers: appKeyAuthValidation
            }
        }
    },
    {
        method: "DELETE",
        path: "/applications/{id}",
        config: {
            handler: handlers.deleteApplication,
            description: "Delete Application",
            notes: "Deletes an application",
            tags: ['api'],
            validate: {
                params: idValidation,
                headers: appKeyAuthValidation
            }
        }
    }
];