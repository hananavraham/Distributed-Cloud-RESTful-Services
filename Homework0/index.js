
var vote = require('./vote');
var http    = require('http'),
    express = require('express'),
    app     = express();

// example usage: vote(<maxVoteNumber>, <voteCategory>, {listofVotesObject})
var v1 = vote(5, "Cars",{Toyota:0,Mazda:0,Skoda:0});
v1.addVote("Skoda");
v1.addVote("Skoda");
v1.addVote("Skoda");

v1.resetVotes();

v1.addVote("Mazda");
v1.addVote("Skoda");
v1.addVote("Skoda");
v1.addVote("Skoda");

v1.showResults();

console.log(v1.getAllVotesRecord());

app.get('/',function (req,res) {
    res.send(v1.getAllVotesRecord());
});

http.createServer(app).listen(3000);