"use strict";

require("dotenv").config();
var express = require("express");
var mongoose = require("mongoose");
var request = require("request");

var routes = require("./app/routes/index.js");

var app = express();

mongoose.connect(process.env.MONGO_URI);

var db = mongoose.connection;

request("https://www.googleapis.com/customsearch/v1?key="+process.env.API_KEY+"&cx="+process.env.SEARCH_ENGINE_ID+"&q=flower&searchType=image&fileType=jpg&alt=json", function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body); 
  }
});

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
	console.log("Successfully connected to MongoDB");
	routes(app);
});


app.listen(process.env["PORT"]);
console.log("server is running on "+process.env["PORT"]);