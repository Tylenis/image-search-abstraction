"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var terms = new Schema({
	term: String,
    when: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Terms", terms);