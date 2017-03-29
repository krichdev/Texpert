angular
.module('GenericApp')
.controller('UsersController', [
  '$scope',
  '$stateParams',
  'AuthFactory',
  'UserFactory',
  function($scope, $stateParams, AuthFactory, UserFactory) {
    // DB call to get all gurus

    UserFactory.getAllGurus()
    .then(
      function success(res){
        console.log(res.data)
        $scope.gurus = res.data;
      },
      function error(err){
        console.log("Error", err);
      }
    )

    $scope.getUser = function() {
      $scope.user = AuthFactory.currentUser();
      console.log($scope.user);
    }


  }
])
