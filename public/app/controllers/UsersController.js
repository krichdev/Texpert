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
        console.log("get all gurus in test controller ", res)
        $scope.gurus = res.data;
      }, 
      function error(err){
        console.log("Error", err);
      }
    )

    $scope.getUser = function() {
      var user = AuthFactory.currentUser();
      console.log(user);
    }

    
  }
])
