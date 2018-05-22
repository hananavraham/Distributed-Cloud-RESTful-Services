
var http      = require('http'),
    express   = require('express'),
    url 	    = require('url'),
    bodyParser= require('body-parser'),
    History_event    = require('./history_events'),
    app       = express();
    port 	    = process.env.PORT || 3000;

var requests = require('./requests'); 
let request  = new requests(app); 
	    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.all('*',(req,res,next) =>{
    req.next();
})

app.get('/', (req,res) => {
    res.sendFile(`${__dirname}/index.html`);
});



app.get('/getAllHistory', (req,res) => {
    request.getAllHistory(res);

});


app.post('/getHistoryByYear/',(req,res) =>{
    request.getHistoryByYear(req,res);
})


app.post('/getHistoryByRangeOfYears/', (req,res) =>{
    request.getHistoryByRangeOfYears(req,res);
});


http.createServer(app).listen(port);