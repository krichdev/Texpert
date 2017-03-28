angular
.module('GenericApp')
.controller('Test', [
  '$scope',
  '$stateParams',
  'AuthFactory',
  function($scope, $stateParams, AuthFactory) {
    getUser();


    getUser = function() {
      var user = AuthFactory.currentUser();
      console.log(user);
    }
  }
])