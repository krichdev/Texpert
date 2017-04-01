angular
.module('TexpertApp')
.controller('AllUserCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  '$window',
  'AuthFactory',
  'UserFactory',
  'socket',
  function($scope, $state, $stateParams, $window, AuthFactory, UserFactory, socket) {
    
    // VARIABLES
    $scope.guru;
    $scope.gurus;
    $scope.currentUserId;

    //DB call to get required Info on page render
    getPageData();

    // FUNCTIONS
    function getPageData() {
      $scope.currentUserId = AuthFactory.getCurrentUserId();
      getUser();
      getAllUsers();
    }

    function getAllUsers() {
      UserFactory.getAllUsers()
      .then(
        function success(res){
          $scope.gurus = res.data;
        },
        function error(err){
          errorMsg(err);
        }
      )
    }

    function getUser() {
      UserFactory.getUser($scope.currentUserId)
      .then(
        function success(res) {
          $scope.guru = res.data;
        },
        function error(err){
          errorMsg(err);
        }
      )
    }
    
    function errorMsg(err) {
      Materialize.toast('Sorry, an error occured', err);
    }

    //Socket Chat 
    var nickname;
    var roomId = roomId();
    console.log(roomId)
    function roomId(){
      var room = '';
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()";

      for(var i = 0; i < 4; i++){
        room += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return room;
    }

    $scope.join = function() {
    
      nickname = AuthFactory.currentUser();
      $window.localStorage['nickname'] = nickname;
      console.log('nickname, ', nickname)
      socket.emit('join', {
        nickname: nickname,
        room: roomId
      });

      $state.go('chat', {id: roomId});
    };


  }

])