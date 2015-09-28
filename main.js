'use strict';

var app = require('app');
var tray = require('./app/js/core-tray.js');
var speech = require('./app/js/core-speech.js');
var shortcuts = require('./app/js/core-shortcuts.js');
var config = require('./app/js/core-config.js');
var mainWindow = require('./app/js/core-main-window.js');
var settingsWindow = require('./app/js/core-settings-window.js');



app.on('ready', function () {
    tray.onOpenSettings(settingsWindow.open);
    tray.onSay(speech.say);
    tray.onClose(close);

    shortcuts.onSay(speech.say);

    mainWindow.onOpenSettings(settingsWindow.open);
    mainWindow.onSay(speech.say);
    mainWindow.onClose(close);

    settingsWindow.onUpdateSettings(config.save);

    config.onChange(speech.updateSettings);
    config.onChange(tray.updateSettings);
    config.onChange(shortcuts.updateSettings);
    config.onChange(mainWindow.updateSettings);
    config.onChange(settingsWindow.updateSettings);

    config.load();
    mainWindow.open();
});

function close() {
    app.quit();
}








