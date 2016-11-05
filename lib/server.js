'use strict';
import Glue from "glue";
import {appName, glueComposeOptions} from "./config";
import manifest from "./manifest";

Glue.compose(manifest, glueComposeOptions, (err, server) => {
	if(err){
		throw err;
	}
    server.start(() => {
        console.log(appName + " online!");
    });
});