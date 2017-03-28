angular
.module('GenericApp')
.controller('Test', [
  '$scope',
  '$stateParams',
  'AuthFactory',
  function($scope, $stateParams, AuthFactory) {
    getUser();

    function getUser() {
      var user = AuthFactory.currentUser();
      console.log(user);
    }
  }
])