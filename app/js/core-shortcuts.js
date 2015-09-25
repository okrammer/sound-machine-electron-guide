var globalShortcut = require('global-shortcut');
var events = require('./core-events.js').create();

var sayFunction;
events.event('say');

function updateSettings(settings) {
    globalShortcut.unregisterAll();
    var shortcuts = settings.shortcuts;

    var shortcutPrefix = shortcuts.length === 0 ? '' : shortcuts.join('+') + '+';

    for(var i = 0; i < 9; i++){
        (function(i){
            globalShortcut.register(shortcutPrefix + (i+1), function () {
                var quote = settings.quotes[i];
                sayFunction(quote)
            });
        }(i));
    }
}


module.exports = {
    onSay: events.onSay,
    updateSettings: updateSettings
};
