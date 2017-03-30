(function() {
  'use strict';

  angular
    .module('TexpertApp')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$window', 'socket', 'AuthFactory', 'UserFactory'];

  function MainCtrl($scope, $window, socket, AuthFactory, UserFactory) {
      $scope.message = '';
      $scope.messages = [];
      $scope.users = [];
      $scope.likes = [];
      $scope.mynickname = '';
      $scope.singleUser = UserFactory.getUser($window.localStorage['currentUserId']).then(function success(data){
                            $scope.mynickname = data.data.name;
                            console.log($scope.mynickname);
                            return data.data;
                          }, function error(err){
                            console.log('error ',err);
                          });

      var nickname = $scope.mynickname;
      console.log($scope.my);
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