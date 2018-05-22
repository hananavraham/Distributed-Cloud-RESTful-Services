
var mongoose = require('mongoose'),
	history_event = new mongoose.Schema({
		year: {
		 	type:String,
		 	index:1
		},
	 	events: [
	 		{
	 			date: {
	 				type:String
	 			},

	 			event:{
	 				type:String
	 			}
	 		}
	 	] 	
});

var History_event = mongoose.model('History_event',history_event);
module.exports = History_event;