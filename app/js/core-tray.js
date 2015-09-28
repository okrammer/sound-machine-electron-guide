//var remote = require('remote');
var Menu = require('menu');
var Tray = require('tray');
var path = require('path');
var events = require('./core-events.js').create('say', 'close', 'openSettings');

var trayIcon;

function updateSettings(settings) {
    if(!trayIcon) {
        if (process.platform === 'darwin') {
            console.log('dirname:' + __dirname);
            var iconPath = path.join(__dirname, '../img/tray-iconTemplate.png');
            console.log('iconPath:' + iconPath);
            trayIcon = new Tray(iconPath);
        }
        else {
            trayIcon = new Tray(path.join(__dirname, '../img/tray-icon-alt.png'));
        }
    }

    var trayMenuTemplate = [
        {
            label: 'Sound machine',
            enabled: false
        },
        {
            label: 'Settings',
            click: function () {
                events.openSettings();
            }
        },
        {
            label: 'Quit',
            click: function () {
                events.close();
            }
        }
    ];
    var trayMenuTemplate = trayMenuTemplate.concat(
        settings.quotes.slice(0, 8).map(function (quote) {
            return {
                label: 'Say: ' + quote.label,
                click: function () {
                    events.say(quote);
                }
            }
        })
    );
    trayMenu = Menu.buildFromTemplate(trayMenuTemplate);
    trayIcon.setContextMenu(trayMenu);

}

module.exports = {
    updateSettings: updateSettings,
    onSay: events.onSay,
    onClose: events.onClose,
    onOpenSettings: events.onOpenSettings,
};
