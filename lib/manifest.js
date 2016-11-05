"use strict";
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
        }
    ]
};