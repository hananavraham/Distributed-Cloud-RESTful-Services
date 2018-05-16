
var http    = require('http'),
    express = require('express'),
    url 	= require('url'),
    data 	= require('./data/data.json'),
    bodyParser = require('body-parser'),
    app     = express();
    port 	= process.env.PORT || 3000;

var routes  = require('./routes');
	
//app.use('/asstes',express.static(`${__dirname}/public`));    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.all('*',(req,res,next) =>{
   // res.sendFile(`${__dirname}/index.html`);
    req.next();
})

app.get('/', (req,res) => {
    res.sendFile(`${__dirname}/index.html`);
});



app.get('/getAllHistory', (req,res) => {
    res.status(200).json(data);
});


app.post('/getHistoryByYear/',(req,res) =>{
	//res.json({year: req.body.year});
    //;
    var foundEvent = false;
    var year = req.body.year;
    var date = req.body.date;
    for(let i in data.historyEvents){
    	var event = data.historyEvents[i];
    	if(event.year == year){
    		res.status(200).json({year:year,"events":event.events});
    	}
    }
    if(!foundEvent){
		res.status(200).json({"error":"date not found"});
    }

})


app.post('/getHistoryByYearAndDate/', (req,res) =>{
	var foundEvent = false;
    var year = req.body.year;
    var date = req.body.date;
    for(let i in data.historyEvents){
    	var event = data.historyEvents[i];
    	if(event.year == year){
    		for(let j in event.events){
    			var subevent = event.events[j];
    			if(subevent.date == date){
    				foundEvent = true;
    				res.status(200).json({"event":subevent.event});
    			}
    		}
    	}
    }
    if(!foundEvent){
		res.status(200).json({"error":"date not found"});
    }
});


http.createServer(app).listen(port);