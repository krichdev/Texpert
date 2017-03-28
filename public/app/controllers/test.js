angular
.module('GenericApp')
.controller('Test', [
  '$scope',
  '$stateParams',
  'AuthFactory',
  function($scope, $stateParams, AuthFactory) {
    $scope.getUser;


    $scope.getUser = function() {
      var user = AuthFactory.currentUser();
      console.log(user);
    }
  }
])