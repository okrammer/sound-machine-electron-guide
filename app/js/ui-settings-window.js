'use strict';

var ipc = require('ipc');

angular.module('settings-window', []).controller('MainController', function ($scope) {


    function update(settings) {
        $scope.quotes = settings.quotes || [];
        var idOffset = new Date().getTime();
        for (var i = 0; i < $scope.quotes.length; i++) {
            $scope.quotes[i].id = idOffset + i;
        }

        $scope.command = settings.command;

        var shortcuts = settings.shortcuts || [];
        $scope.key_alt = shortcuts.indexOf('alt') !== -1;
        $scope.key_ctrl = shortcuts.indexOf('ctrl') !== -1;
        $scope.key_shift = shortcuts.indexOf('shift') !== -1;

    }


    function createSettings() {
        var shortcuts = [];
        if ($scope.key_alt) {
            shortcuts.push('alt');
        }
        if ($scope.key_ctrl) {
            shortcuts.push('ctrl');
        }
        if ($scope.key_shift) {
            shortcuts.push('shift');
        }

        var quotes = $scope.quotes;
        quotes.sort(function (q1, q2) {
            return (q1.index || 1000) - (q2.index || 1000);
        });
        for (var i = 0; i < quotes.length; i++) {
            quotes[i].index = i;
        }

        var newSettings = {
            shortcuts: shortcuts,
            quotes: quotes,
            command: $scope.command
        };
        return newSettings;
    }

    $scope.close = function () {
        ipc.send('settings-window-close', createSettings());
    };

    $scope.add = function () {
        console.log("add");
        $scope.quotes.push({
            id: new Date().getTime(),
            index: $scope.quotes.length,
            label: $scope.label,
            text: $scope.text,
            voice: $scope.voice
        });
        $scope.label = null;
        $scope.text = null;
        $scope.voice = null;
    };

    $scope.remove = function (index) {
        console.log("removing: " + index);
        $scope.quotes.splice(index, 1);
    };

    ipc.on('update-settings', function (settings) {
        $scope.$apply(function(){
            update(settings);
        });

    });

    ipc.send('settings-window-ready');

});
