(function() {
  'use strict';

  angular
    .module('TexpertApp')
    .controller('JoinCtrl', [
      '$state',
      "$scope",
      '$window',
      'socket',
      function($state, $scope, $window, socket) {
        $scope.name = '';
        var nickname;

        $scope.join = function() {
          nickname = $scope.name;
          $window.localStorage['nickname'] = nickname;
          console.log('nickname, ', nickname)
          socket.emit('join', {
            nickname: nickname
          });

          $state.go('main');
        };

      }
])})();