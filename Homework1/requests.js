
var	mongoose = require('mongoose'),
	History_event = require('./history_events');

let MLAB_KEY = 'mongodb://db_user:db_pass@ds229790.mlab.com:29790/history_api';

module.exports = class Requests {

	/* this function return all history events via GET request*/
	getAllHistory(res){
		mongoose.connect(MLAB_KEY)
	  	.then(
		    () => {
		  	History_event.find({},
		        (err, event) => {
		          if (err) console.log(`query error: ${err}`);
		          res.status(200).json(event);
		      });
		    },
		    err => {
		      console.log(`connection error: ${err}`);
		    }
 		);
	}

	/* this function return history events of specific year via POST request*/
	getHistoryByYear(req,res){
		var year = req.body.year;
		mongoose.connect(MLAB_KEY)
  .then(
    () => {
  	History_event.find({year:year},
        (err, event) => {
          if (err) console.log(`query error: ${err}`);
          res.status(200).json(event);
      });
    },
    err => {
      console.log(`connection error: ${err}`);
    }
 );

	}
	/* this function return history events by range of years via POST request*/
	getHistoryByRangeOfYears(req,res){
		var foundEvent = false;
	    var start_year = req.body.start_year;
	    var end_year = req.body.end_year;
    	mongoose.connect(MLAB_KEY)
		  .then(
		    () => {
		    History_event.find({year:{$gte:start_year,$lte:end_year}},
		        (err, events) => {
		          if (err) console.log(`query error: ${err}`);
		          console.log(events);
		          res.status(200).json(events);
		      });
		    },
		    err => {
		      console.log(`connection error: ${err}`);
		    }
		 );
	}

}