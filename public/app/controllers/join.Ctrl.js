(function() {
  'use strict';

  angular
    .module('TexpertApp')
    .controller('JoinCtrl', [
      '$state',
      "$scope",
      '$window',
      'socket',
      'AuthFactory',
      function($state, $scope, $window, socket, AuthFactory) {
        $scope.name = '';
        var nickname;
        var roomId = roomId();

        function roomId(){
          var roomId = '';
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()";

          for(var i = 0; i < 4; i++){
            roomId += possible.charAt(Math.floor(Math.random() * possible.length));
            return roomId;
          }
        }

        $scope.join = function() {
          nickname = $scope.name;
          $window.localStorage['nickname'] = nickname;
          console.log('nickname, ', nickname)
          socket.emit('join', {
            nickname: AuthFactory.currentUser(),
            room: roomId
          });

          $state.go('chat', {id: roomId});
        };

      }
])})();