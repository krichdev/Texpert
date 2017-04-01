angular
.module('TexpertApp')
.controller('UsersController', [
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
    $scope.isCurrentUsersPage;

    $scope.chatHistory;
    $scope.currentUserId = AuthFactory.getCurrentUserId();
    $scope.getUser = getUser;
    $scope.getAllUsers = getAllUsers;
    $scope.updateUser = updateUser;
    $scope.getAProfile = getAProfile;

    // DB call to get required info based on page
    // called on page render
    getPageData();


    // FUNCTIONS
    //determines which userdata is required
    function getPageData () {
      getUser();
      if ($state.current.name == 'allGurus') {
        getAllUsers();
      }
      if ($state.current.name == 'profilePage') {
        getAProfile();
      }
      if ($state.current.name == 'profilePage' &&
      $scope.currentUserId == $stateParams.id) {
        $scope.isCurrentUsersPage = true;
      } else {
        $scope.isCurrentUsersPage = false;
      }
    }

    function getAllUsers() {
      UserFactory.getAllUsers()
      .then(
        function success(res){
          console.log('getting allGurus');
          $scope.gurus = res.data;
        },
        function error(err){
          console.log("Error", err);
        }
      )
    }

    function getUser() {
      UserFactory.getUser($scope.currentUserId)
      .then(
        function success(res) {
          $scope.guru = res.data;
          console.log('pages id: ',$scope.guru.id)
          console.log('current id: ',$scope.currentUserId )
          if ($scope.guru.chatHistory) {
            $scope.chatHistory = $scope.guru.chatHistory;
            console.log('user controller', $scope.guru.profilePic)
            console.log('got a guru: ', $scope.guru);

            console.log($scope.chatHistory)
          }
        },
        function error(){
          Materialize.toast('Sorry, there was some sort of error', 3000);
        }
      )
    }
    function getAProfile() {
      UserFactory.getUser($stateParams.id)
      .then(
        function success(res) {
          $scope.guru = res.data;
          if ($scope.guru.chatHistory) {
            $scope.chatHistory = $scope.guru.chatHistory;
            console.log('user controller', $scope.guru.profilePic)
            console.log('got a guru: ', $scope.guru);

            console.log($scope.chatHistory)
          }
        },
        function error() {
          Materialize.toast('Sorry, there was some sort of error', 3000);
        }
      )
    }

    function updateUser() {
      console.log('updatebtn clicked')
      var id = $stateParams.id;
      UserFactory.updateUser(id, $scope.guru)
      .then(
        function success(res) {
        $state.go('profilePage', {id: id});
        },
        function error(err) {
          console.log('error', err);
        }
      )
    }

    // Socket Chat *** NOW IN AllUsersController *** Commenting Out For Now
    // var nickname;
    // var roomId = roomId();
    // console.log(roomId)
    // function roomId(){
    //   var room = '';
    //   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()";

    //   for(var i = 0; i < 4; i++){
    //     room += possible.charAt(Math.floor(Math.random() * possible.length));
    //   }
    //   return room;
    // }

    // $scope.join = function() {
    
    //   nickname = AuthFactory.currentUser();
    //   $window.localStorage['nickname'] = nickname;
    //   console.log('nickname, ', nickname)
    //   socket.emit('join', {
    //     nickname: nickname,
    //     room: roomId
    //   });

    //   $state.go('chat', {id: roomId});
    // };

  }
]);
