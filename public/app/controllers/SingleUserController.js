angular
.module('TexpertApp')
.controller('SingleUserCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  'AuthFactory',
  'MessageFactory',
  'UserFactory',
  function($scope, $state, $stateParams, AuthFactory, MessageFactory, UserFactory) {
   
    // VARIABLES
    $scope.guru;
    $scope.chatHistory;
    $scope.isCurrentUsersPage;
    $scope.messageList;
    $scope.currentUserInfo = {
      id: '',
      userType: ''
    };
    //public functions
    $scope.updateUser = updateUser;

    // Runs on page render
    verifyUser();

    // FUNCTIONS
    function verifyUser() {
      // Only allows signed-in users to see Guru list
      if (!AuthFactory.isLoggedIn()) {
        $state.go('home');
        Materialize.toast('You need to be logged in to see this page', 10000);
        return;
      } else { 
        //DB call to get required Info on page render
        getPageData();
      }
    }

    function getPageData() {
      $scope.currentUserInfo = JSON.parse(AuthFactory.getCurrentUserInfo());
      
      getAProfile(); 
      getMessages();
      

      // determines if current user is current page's owner
      if ($scope.currentUserInfo.id == $stateParams.id) {
        $scope.isCurrentUsersPage = true;
      } else {
        $scope.isCurrentUsersPage = false;
      }
    }

    //db call for all Messages
    function getMessages() {
      MessageFactory.getAllMessages()
      .then(
        function success(res) { 
          $scope.messageList = res.data.filter(function(message) {
            return message.userId == $scope.currentUserInfo.id && message.claimed == '';
          }) 
        },
        function error(err) { errorMsg(err); }
      )
    }
    // get data for current page's user detail
    function getAProfile() {
      UserFactory.getUser($stateParams.id)
      .then(
        function success(res) {
          $scope.guru = res.data;
          if ($scope.guru.chatHistory) {
            $scope.chatHistory = $scope.guru.chatHistory;
            console.log($scope.guru)
          }
        },
        function error(err){
          errorMsg(err);
        }
      )
    }

    // update modal's submit button
    function updateUser() {
      var id = $stateParams.id;
      UserFactory.updateUser(id, $scope.guru)
      .then(
        function success(res) { $state.go('profilePage', {id: id}); },
        function error(err) { errorMsg(err); }
      )
    }

    function errorMsg(err) {
      Materialize.toast('Sorry, an error occured', err);
    }
  }
]);