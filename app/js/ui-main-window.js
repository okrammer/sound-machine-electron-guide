'use strict';

var ipc = require('ipc');
var angular = require('angular');


angular.module('main-window', []).controller('MainController', function ($scope) {

    $scope.rows = [];

    $scope.openSettingsWindow = function () {
        console.log('main-window openSettings()');
        ipc.send('main-window-open-settings');
    };

    $scope.close = function () {
        console.log('main-window close()');
        ipc.send('main-window-close');
    };

    $scope.say = function (quote) {
        console.log('main-window say()');
        ipc.send('main-window-say', quote);
    };


    function calculateRows(quotes) {
        var rows = [];
        for (var i = 0; i < Math.ceil(quotes.length / 3); i++) {
            rows.push(quotes.slice(i * 3, i * 3 + 3));
        }
        return rows;
    }

    function updateUi(quotes) {
        console.log('main-window updateUi()');
        $scope.$apply(function () {
            $scope.rows = calculateRows(quotes);
        });
    };

    ipc.on('update-settings', function (settings) {
        console.log('main-window update-settings');
        updateUi(settings.quotes);
    });


    ipc.send('main-window-ready');

});
