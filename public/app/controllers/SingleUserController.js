angular
.module('TexpertApp')
.controller('UsersController', [
  '$scope',
  '$state',
  '$stateParams',
  '$window',
  'AuthFactory',
  'UserFactory',
  function($scope, $state, $stateParams, $window, AuthFactory, UserFactory) {
   
    // VARIABLES
    $scope.guru;
    $scope.isCurrentUsersPage;
    $scope.chatHistory;
    $scope.currentUserId;

    //DB call to get required Info on page render
    getPageData();

    // FUNCTIONS
    function getPageData() {
      getUser();
      getAProfile();

      if ($state.currentUserId == $stateParams.id) {
        $scope.isCurrentUsersPage = true;
      } else {
        $scope.isCurrentUsersPage = false;
      }
    }
  }
]);