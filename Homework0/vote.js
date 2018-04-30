var events = require('events');
    eventsConfig = require('./config').events;

var logger = require('./logger'); 
let log = new logger();   // create Logger class instance

class Vote extends events.EventEmitter{
    constructor(maxVote,group,groupList){
        super();
        this.voteCount = 0;
        this.maxVote = maxVote;
        this.groupList = groupList;
        this.group = group;
        log.addLog(`Category: ${group}, Options:`);
        log.addLog(groupList);
        log.addLog(`Maximum Votes: ${maxVote}`);

    }


    addVote(name){
         if (this.voteCount == this.maxVote){       // checking if we reached maximum votes
            log.addLog("Sorry, you have reached the maximum votes..");
            return;
        }
        log.addLog(`Adding Vote to ${this.group}......`);
        this.groupList[name] += 1;
        this.voteCount += 1;
        this.emit(eventsConfig.displayVotes);       // firing printing to screen events
    }

    resetVotes(){       // reset all votes
        log.addLog("Clearing all votes.......");
        this.voteCount = 0;
        for(var key in this.groupList)
            this.groupList[key] = 0;
        this.emit(eventsConfig.displayVotes);
    }

    showResults(){      // printing votes results
        log.addLog(`The Votes Results for ${this.group} are: `);
        log.addLog(`Total Votes: ${this.voteCount}`);
        for(var key in this.groupList)
        log.addLog(`${key} ${this.groupList[key]}`);     
    }

    getAllVotesRecord(){
        return log.getLogs();
    }

}

function displayVotes(){
    for(var key in this.groupList)
        log.addLog(`${key} ${this.groupList[key]}`);
}


module.exports = (maxVote,group,groupList) => {
    var vote = new Vote(maxVote,group,groupList);
    vote.on(eventsConfig.displayVotes, displayVotes);
    return vote;
}