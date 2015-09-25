//var remote = require('remote');
var configuration = require('../../configuration');
var events = require('./core-events.js').create();
var FILE_NAME = 'sound-machine';

events.event('change');

var changeCount = 0;

function load(){
    var settings = configuration.readSettings(FILE_NAME);
    if (!settings) {
        settings = {
            shortcuts: ['ctrl', 'shift'],
            quotes: [
                {
                    index: 0,
                    label: 'hello',
                    text: 'Hallo World!',
                    voice: 'Petra'
                }
            ],
            command: 'say "$TEXT$" -v $VOICE$'
        };
        save(settings);
    }
    settings.changeCount = 0;
    changeCount = 0;
    events.change(settings);
}


function save(settings){
    if(changeCount !== settings.changeCount){
        configuration.saveSettings(FILE_NAME, settings);
        changeCount = settings.changeCount;
        events.change(settings);
    }
}

module.exports = {
    load: load,
    save: save,
    onChange: events.onChange,
};
