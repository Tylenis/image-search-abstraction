"use strict";

module.exports = function (app) {
	app.route("/")
		.get(function (req, res) {
			res.send("labas");
		});
	app.route("/api/latest/imagesearch/")
		.get(function(req, res){
			res.json({});
		});
};