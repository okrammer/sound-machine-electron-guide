'use strict';
var events = require('./core-events.js').create('change');
var nconf = require('nconf').file({file: getUserHome() + '/sound-machine-config.json'});

var NAME = 'sound-machine';

function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

function load(){
    nconf.load();
    var settings = nconf.get(NAME);
    if (!settings) {
        settings = {
            shortcuts: ['ctrl', 'shift'],
            quotes: [
                {
                    id: new Date().getTime(),
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
    nconf.set(NAME, settings);
    nconf.save();
        events.change(settings);
}

module.exports = {
    load: load,
    save: save,
    onChange: events.onChange
};
