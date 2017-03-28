angular
.module('GenericApp')
.controller('Test', [
  '$scope',
  '$stateParams',
  'AuthFactory',
  'UserFactory',
  function($scope, $stateParams, AuthFactory, UserFactory) {
    $scope.getUser;

    $scope.getUser = function() {
      var user = AuthFactory.currentUser();
      console.log(user);
    }

    UserFactory.getAllGurus()
    .then(function success(res){
      console.log("get all gurus in test controller ", res)
      $scope.gurus = res.data;
    }, function error(err){
      console.log("Error", err);
    })
  }
])
