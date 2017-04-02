(function() {
  'use strict';

  angular
    .module('TexpertApp')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = [
    '$scope', 
    '$state', 
    '$stateParams', 
    '$window', 
    'socket', 
    'AuthFactory',
    'MessageFactory', 
    'UserFactory'];

  function MainCtrl($scope, $state, $stateParams, $window, socket, AuthFactory, MessageFactory, UserFactory) {
      
      // VARIABLES
      $scope.message = '';
      $scope.messages = [];
      $scope.chatName = '';
      $scope.users = [];
      $scope.likes = [];
      $scope.mynickname = '';
      $scope.myUserType = '';
      $scope.singleUser = {};
      $scope.profilePic;
      $scope.currentUserInfo;
      $scope.originalIssueForm = {};
      $scope.chatLog = {
        messages: $scope.messages
      };
      
      // call this function on chatroom start
      getPageData();


      // FUNCTIONS

      // get user object from database and store into $scope.singleUser
      function getPageData() {
        $scope.currentUserInfo = JSON.parse($window.localStorage['currentUserInfo']);
        
        getSingleUser();
        getMessage();
      }
      function getMessage() {
        console.log('params: ', $stateParams.id)
        MessageFactory.getMessageByRoomId($stateParams.id)
        .then(
          function success(res) {
            $scope.originalIssueForm = res.data;
            console.log('success, ', res.data);
          },
          function error(err) {
            console.log(err);
          }
        )
      }
      function getSingleUser() {
        UserFactory.getUser($scope.currentUserInfo.id)
        .then(
          function success(res) {
            $scope.singleUser   = res.data;
            $scope.mynickname   = $scope.singleUser.name;
            $scope.myUserType   = $scope.singleUser.userType;
            $scope.chatHistory  = $scope.singleUser.chatHistory;
            $scope.profilePic   = $scope.singleUser.profilePic;
          },
          function error(err) {
            con$scope.sole.log('error', err);
          });
      }
      
      $scope.exitChat = function(resolution) {
        if (resolution == 'resolved') {
          $scope.originalIssueForm.claimed  = 'archive';
        } else {
          $scope.originalIssueForm.claimed  = '';
          $scope.originalIssueForm.chatId   = '';
        }

        MessageFactory.updateMessage($scope.originalIssueForm)
        .then (
          function success() {
            $state.go('profilePage', { id: $scope.currentUserInfo.id });
            var toastMsg = (resolution == 'resolved') ? 
            'Sounds like your issue was resolved :)' :
            'Sorry that tech could\'nt figure it out';
            
            Materialize.toast(toastMsg, '5000');
          },
          function error(err) {
            console.log('error', err);
            Materialize.toast('Oh no, looks like something went wrong', 5000);
          }
        )
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
        UserFactory.updateUser($scope.currentUserInfo.id, $scope.singleUser)
      }

      var nickname = $scope.mynickname;
      socket.emit('get-users');


      // Socket Stuff
      $scope.sendMessage = function(data) {
        var newMessage = {
          message:  $scope.message,
          from:     $scope.mynickname,
          pic:      $scope.profilePic
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