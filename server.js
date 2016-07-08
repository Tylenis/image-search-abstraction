"use strict";

require("dotenv").config();
var express = require("express");
var mongoose = require("mongoose");

var URL = "https://www.googleapis.com/customsearch/v1?key=";

var routes = require("./app/routes/index.js");

var app = express();

mongoose.connect(process.env.MONGO_URI);

var db = mongoose.connection;



db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
	console.log("Successfully connected to MongoDB");
	routes(app, URL, process.env.API_KEY, process.env.SEARCH_ENGINE_ID);
});


app.listen(process.env.PORT);
console.log("server is running on "+process.env.PORT);