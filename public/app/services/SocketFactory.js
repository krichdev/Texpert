angular
.module('TexpertApp')
.factory('socket', [
  '$rootScope', 
  function($rootScope){
    var socket = io.connect();

    return {
      on: on,
      emit: emit
    };

    function on(eventName, cb){
      socket.on(eventName, function(){
        var args = arguments;
        $rootScope.$apply(function(){
          cb.apply(socket, args)
        });
      });
    }
    function emit(eventName, data, callback) {
        socket.emit(eventName, data, function() {
          var args = arguments;
          $rootScope.$apply(function() {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        });
      }
}])