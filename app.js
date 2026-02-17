const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const shortUrlRouter = require("./routers/shortUrlRoutes");
const validationController = require("./controllers/validationController");
const responseHandler = require("./utils/responseHandler");

dotenv.config({ path: "./config.env" });

const app = express();

//logging middleware
app.use(morgan("dev"));

// Global Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// endpoint routes
app.use("/", shortUrlRouter);

app.use(validationController.invalidPathHandler);

// error handling middleware
app.use(responseHandler.globalErrorHandler);

module.exports = app;
