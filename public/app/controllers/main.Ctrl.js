(function() {
  'use strict';

  angular
    .module('TexpertApp')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$window', 'socket', 'AuthFactory', 'UserFactory'];

  function MainCtrl($scope, $window, socket, AuthFactory, UserFactory) {
      $scope.message = '';
      $scope.messages = [];
      $scope.chatName = '';
      $scope.users = [];
      $scope.likes = [];
      $scope.mynickname = '';
      $scope.myUserType = '';
      $scope.singleUser = {};
      $scope.currentUserId = $window.localStorage['currentUserId'];
      $scope.chatLog = {
        messages: $scope.messages
      };
      
      // call this function on chatroom start
      getSingleUser();


      // get user object from database and store into $scope.singleUser
      function getSingleUser() {
        UserFactory.getUser($scope.currentUserId)
        .then(
          function success(res) {
            $scope.singleUser = res.data;
            $scope.mynickname = $scope.singleUser.name;
            $scope.myUserType = $scope.singleUser.userType;
            $scope.chatHistory = $scope.singleUser.chatHistory;
          },
          function error(err) {
            console.log('error', err);
          });
      }
      
      $scope.saveChat = function(){
        // if !user.chatHistory, make it
        if (!$scope.singleUser.chatHistory) {         
          $scope.singleUser.chatHistory = {};
        }
        // save chat log to user's
        $scope.singleUser.chatHistory[$scope.chatName] = $scope.chatLog;
        Materialize.toast('Chatlog has been saved', 2000);

        //make put request to update user's db
        UserFactory.updateUser($scope.currentUserId, $scope.singleUser)
      }

      var nickname = $scope.mynickname;
      socket.emit('get-users');


      // Socket Stuff
      $scope.sendMessage = function(data) {
        var newMessage = {
          message: $scope.message,
          from: $scope.mynickname
        };
        socket.emit('send-message', newMessage);
        $scope.message = '';
        //   $scope.messages.push(newMessage);
      };

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

  }
})();