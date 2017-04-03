angular
.module('TexpertApp')
.controller('HelpBoardCtrl', [
  '$scope',
  '$state',
  '$window',
  'AuthFactory',
  'MessageFactory',
  'socket',
  'UserFactory',
  function($scope, $state, $window, AuthFactory, MessageFactory, socket, UserFactory) {
    
    // VARIABLES
    $scope.messageList;
    $scope.currentUserInfo = {
      id: '',
      userType: '',
    };


    // Runs on page render
    verifyUser();


    // FUNCTIONS
    function verifyUser() {
      // Only allows signed-in users to see Guru list
      if (!AuthFactory.isLoggedIn()) {
        $state.go('home');
        Materialize.toast('You need to be logged in to see this page', 10000);
      } else { 
        //DB call to get required Info on page render
        getPageData();
      }
    }
    function getPageData() {
      // get basic user info
      $scope.currentUserInfo = JSON.parse(AuthFactory.getCurrentUserInfo());
      
      // db call to load all messages
      MessageFactory.getAllMessages()
      .then(
        function success(res) { $scope.messageList = res.data; },
        function error(err) { errorMsg(err); }
      )
    }


    //SOCKET CHAT CODE
    var nickname;
    var roomId;


    $scope.createUserLink = function() {
      roomId = generateRoomId();
      $scope.messageList[this.$index].chatId = roomId;
      $scope.messageList[this.$index].claimed = $scope.currentUserInfo.id;

      //db call, updates the message with a chatroomId & User assigned to task
      MessageFactory.updateMessage($scope.messageList[this.$index])
      .then(
        function success(res) { createChatroom(roomId); },
        function error(err) { errorMsg(err); }
      )
    }
    function generateRoomId(){
      var room = '';
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()";

      for(var i = 0; i < 4; i++){
        room += possible.charAt(Math.floor(Math.random() * possible.length));
      } 
      return room;
    }
    function createChatroom(roomId) {
      nickname = AuthFactory.currentUser();
      $window.localStorage['nickname'] = nickname;
      socket.emit('join', {
        nickname: nickname,
        room: roomId
      });
      $state.go('chat', {id: roomId});
    };
    // displays generic error message for 5 seconds
    function errorMsg(err) {
      Materialize.toast('An error occurred: ' + err.data.message, '5000');
    }
  }
]);