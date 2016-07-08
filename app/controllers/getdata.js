"use strict";

var request = require("request");
var termsmodel = require("../models/terms.js");

function Handlers(){
  this.customSearch = function(URL, API_KEY, SEARCH_ENGINE_ID, req, res){
    request(URL+API_KEY+"&cx="+SEARCH_ENGINE_ID+"&q="+req.params.id+"&searchType=image&alt=json&start="+req.query.offset,
    function (error, response, body) {
      if(error){
        return console.error(error);
      } else if (!error && response.statusCode == 200) {
        var parsedObj = JSON.parse(body).items;
        var rez = [];
        for(var i=0; i<parsedObj.length; i++){
          var temp = {"url": parsedObj[i].link,
          "snippet": parsedObj[i].snippet,
          "thumbnail": parsedObj[i].image.thumbnailLink,
          "context": parsedObj[i].image.contextLink};
          rez.push(temp);
        }
        var newterm = new termsmodel({term: req.params.id});
        newterm.save(function (err, saved) {
          if(err){
            return console.error(err);
          } else {
            res.json(rez);
          }
        });
      } else{
        res.json(JSON.parse(body));
      }
    });
  };
  this.fromDb = function(res){
    termsmodel.find().sort("-when").limit(10).exec(function(err, results){
      if(err){
					return console.error(err);
				} else {
				  var finaldata = [];
				  for(var i=0; i<results.length; i++){
				    var temp = {"term" : results[i].term, "when": results[i].when};
				    finaldata.push(temp);
				  }
					res.json(finaldata);
				}
    });
  };
}


module.exports = Handlers;