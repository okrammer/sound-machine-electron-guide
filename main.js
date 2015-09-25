'use strict';

var app = require('app');
var tray = require('./app/js/core-tray.js');
var speech = require('./app/js/core-speech.js');
var shortcuts = require('./app/js/core-shortcuts.js');
var config = require('./app/js/core-config.js');
var mainWindow = require('./app/js/core-main-window.js');
var settingsWindow = require('./app/js/core-settings-window.js');



app.on('ready', function () {
    shortcuts.onSay(speech.say);
    tray.onOpenSettings(settingsWindow.open);
    tray.onSay(speech.say);
    tray.onClose(close);
    mainWindow.onOpenSettings(settingsWindow.open);
    mainWindow.onSay(speech.say);
    mainWindow.onClose(close);
    settingsWindow.onUpdateSettings(config.save);
    config.onChange(function (settings) {
        [speech, tray, shortcuts, mainWindow, settingsWindow].forEach(function (module) {
            module.updateSettings(settings);
        });
    });
    config.load();
    mainWindow.open();
});

function close() {
    app.quit();
}








