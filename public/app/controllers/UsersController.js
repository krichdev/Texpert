angular
.module('GenericApp')
.controller('UsersController', [
  '$scope',
  '$state',
  '$stateParams',
  'AuthFactory',
  'UserFactory',
  function($scope, $state, $stateParams, AuthFactory, UserFactory) {
    
    // DB call based on page accessing it
    // shows all users for /users, single for /users/:id
    $state.current.name == 'profilePage' ? 
      getUser() : getAllUsers();

    function getAllUsers() {
      UserFactory.getAllGurus()
      .then(
        function success(res){
          console.log('getting allGurus')
          $scope.gurus = res.data;
        }, 
        function error(err){
          console.log("Error", err);
        }
      )
    }

    function getUser() {
      $scope.user = AuthFactory.currentUser();
      console.log($scope.user);
    }
  }
])
