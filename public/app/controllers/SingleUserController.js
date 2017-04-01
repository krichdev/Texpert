angular
.module('TexpertApp')
.controller('SingleUserCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  'AuthFactory',
  'UserFactory',
  function($scope, $state, $stateParams, AuthFactory, UserFactory) {
   
    // VARIABLES
    $scope.guru;
    $scope.chatHistory;
    $scope.isCurrentUsersPage;
    $scope.currentUserInfo = {
      id: '',
      userType: ''
    };

    //public functions
    $scope.updateUser = updateUser;

    //DB call to get required Info on page render
    getPageData();

    // FUNCTIONS
    function getPageData() {
      $scope.currentUserInfo = JSON.parse(AuthFactory.getCurrentUserInfo());
      getAProfile();
      if ($scope.currentUserInfo.id == $stateParams.id) {
        $scope.isCurrentUsersPage = true;
      } else {
        $scope.isCurrentUsersPage = false;
      }
    }

    // get data for current page's user detail
    function getAProfile() {
      UserFactory.getUser($stateParams.id)
      .then(
        function success(res) {
          $scope.guru = res.data;
          if ($scope.guru.chatHistory) {
            $scope.chatHistory = $scope.guru.chatHistory;
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