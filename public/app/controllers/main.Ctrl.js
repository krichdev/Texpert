(function() {
  'use strict';

  angular
    .module('TexpertApp')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$window', 'socket'];

  function MainCtrl($scope, $window, socket) {
      $scope.message = '';
      $scope.messages = [];
      $scope.users = [];
      $scope.likes = [];
      $scope.mynickname = $window.localStorage['nickname'];
      var nickname = $scope.mynickname;

      socket.emit('get-users');

      socket.on('all-users', function(data) {
          console.log(data);
          $scope.users = data.filter(function(item){
              return item.nickname !== nickname;
          });
      });

      socket.on('message-received', function(data) {
        $scope.messages.push(data);
      });

      socket.on('user-liked', function(data) {
          console.log(data);
          $scope.likes.push(data.from);
      });

      $scope.sendMessage = function(data) {
          var newMessage = {
            message: $scope.message,
            from: $scope.mynickname
        };
        socket.emit('send-message', newMessage);
          $scope.message = '';
        //   $scope.messages.push(newMessage);
      };
  }
})();