//var remote = require('remote');


function create(events/* varargs */){

    var obj = {};
    var listeners = {};

    for(var i = 0; i < arguments.length; i ++){
        registerEvent(arguments[i]);
    }

    function methodName(prefix, eventName){
        return prefix + eventName.substr(0, 1).toUpperCase() + eventName.substr(1, eventName.length -1);
    }

    function registerEvent(eventName){
        obj[eventName] = function(){
            var list = listeners[eventName] || []
            var params = arguments;
            list.forEach(function(listener){
                listener.apply(null, params);
            })
        };

        obj[methodName('on', eventName)] = function(){
            var listener = arguments[0];
            var listenerList = (listeners[eventName] = listeners[eventName] || []);
            listenerList.push(listener);
        };
    }



    return obj;
}

module.exports = {
    create: create
};
