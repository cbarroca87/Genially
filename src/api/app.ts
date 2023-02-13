import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import lusca from "lusca";
import dotenv from "dotenv"
dotenv.config()

// Controllers (route handlers)
import * as healthController from "./controllers/health";
import dbConnection from "./database/config";
import router from "./routes/geniallies";


// const checkFields = require("./middlewares/checkFields")

// Create Express server
const app = express();

// Connect with Database
dbConnection();


// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));


// Primary app routes
app.use(router);

export default app;
