//var remote = require('remote');
var exec = require('child_process').exec;

var command;

function say(quote) {
    if(!command || !quote){
        return;
    }
    var commandString = command.replace(/\$TEXT\$/g, quote.text).replace(/\$VOICE\$/, quote.voice);
    console.log('execute: ' + commandString);
    exec(commandString, function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });

}

function updateSettings(settings){
    command = settings.command;
}

module.exports = {
    say: say,
    updateSettings: updateSettings
};
