"use strict";

var dbhandler = require("../controllers/getdata.js");
var handler = new dbhandler();

module.exports = function (app, URL, API_KEY, SEARCH_ENGINE_ID) {
	app.route("/")
		.get(function (req, res) {
			res.sendFile(process.cwd()+"/public/index.html");
		});
	app.route("/api/imagesearch/:id")
		.get(function(req, res){
			handler.customSearch(URL, API_KEY, SEARCH_ENGINE_ID, req, res);
		});
	app.route("/api/latest/imagesearch/")
		.get(function(req, res){
			handler.fromDb(res);
		});
};