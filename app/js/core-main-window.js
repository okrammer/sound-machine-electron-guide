
var ipc = require('ipc');
var BrowserWindow = require('browser-window');
var events = require('./core-events.js').create('openSettings', 'say', 'close');

var lastSettings;
var mainWindow = null;

function open() {
    if(mainWindow){
        return;
    }
    mainWindow = new BrowserWindow({
        frame: false,
        height: 700,
        resizable: false,
        width: 368
    });

    mainWindow.loadUrl('file://' + __dirname + '/../html/main-window.html');
}

function updateMainWindow() {
    if(mainWindow){
        mainWindow.webContents.send('update-settings', lastSettings);
    }
}

function updateSettings(settings){
    lastSettings = settings;
    updateMainWindow(settings);
}

ipc.on('main-window-ready', function () {
    updateMainWindow();
});

ipc.on('main-window-open-settings', function () {
    events.openSettings();
});

ipc.on('main-window-close', function () {
    events.close();
});


ipc.on('main-window-say', function (event, quote) {
    events.say(quote);
});




module.exports = {
    open: open,
    onOpenSettings: events.onOpenSettings,
    onClose: events.onClose,
    onSay: events.onSay,
    updateSettings: updateSettings

};
