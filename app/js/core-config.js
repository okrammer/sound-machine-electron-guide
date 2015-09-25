//var remote = require('remote');
var configuration = require('../../configuration');
var events = require('./core-events.js').create();
var FILE_NAME = 'sound-machine';

events.event('change');


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
    events.change(settings);
}


function save(settings){
        configuration.saveSettings(FILE_NAME, settings);
        events.change(settings);
}

module.exports = {
    load: load,
    save: save,
    onChange: events.onChange,
};
