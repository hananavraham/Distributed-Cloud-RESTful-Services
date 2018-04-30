
//let logs = [];

module.exports = class Logger {
    constructor(){
        this.logs = [];
    }

    addLog(message){        // printing message and add to log list
        console.log(message);
        this.logs.push(message);
    }

    getLogs(){    
        return this.logs;
    }
}