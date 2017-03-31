(function() {
  'use strict';

  angular
    .module('TexpertApp')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$window', 'socket', 'AuthFactory', 'UserFactory'];

  function MainCtrl($scope, $window, socket, AuthFactory, UserFactory) {
      $scope.message = '';
      $scope.messages = [];
      $scope.chatLog = {messages: []};
      $scope.chatName = '';
      $scope.users = [];
      $scope.likes = [];
      $scope.mynickname = '';
      $scope.myUserType = '';
      $scope.singleUser = UserFactory.getUser($window.localStorage['currentUserId']).then(function success(data){
                            $scope.mynickname = data.data.name;
                            $scope.myUserType = data.data.userType;
                            $scope.chatHistory = data.data.chatHistory
                            return data.data;
                          }, function error(err){
                            console.log('error ',err);
                          });
      $scope.saveChat = function(){
        console.log($scope.chatLog)
        $scope.singleUser.chatHistory[$scope.chatName] = $scope.chatLog;
        console.log($scope.singleUser.chatHistory[$scope.chatName])
      }

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
        console.log('from main ctrl msg arr ', $scope.chatLog.messages)
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