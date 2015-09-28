
var ipc = require('ipc');
var BrowserWindow = require('browser-window');
var events = require('./core-events.js').create('updateSettings');

var lastSettings;
var settingsWindow = null;

function open() {
    if (settingsWindow) {
        return;
    }

    settingsWindow = new BrowserWindow({
        frame: false,
        height: 800,
        resizable: false,
        width: 600
    });

    settingsWindow.loadUrl('file://' + __dirname + '/../html/settings-window.html');

    settingsWindow.on('closed', function () {
        settingsWindow = null;
    });
}

function updateSettings(settings){
    lastSettings = settings;
}

ipc.on('settings-window-close', function (event, settings) {
    if (settingsWindow) {
        settingsWindow.close();
    }
    events.updateSettings(settings);
});

ipc.on('settings-window-ready', function () {
    settingsWindow.webContents.send('update-settings', lastSettings);
});


module.exports = {
    open: open,
    updateSettings: updateSettings,
    onUpdateSettings: events.onUpdateSettings
};
