angular
.module('GenericApp')
.controller('NavCtrl', [
  '$scope',
  '$location',
  'AlertsFactory',
  'AuthFactory',
  function($scope, $location, AlertsFactory, AuthFactory) {
    // PUBLIC VARIABLES & FUNCTIONS
    $scope.isLoggedIn = isLoggedIn;
    $scope.logout = logout;    

    
    //PRIVATE FUNCTIONS
    function isLoggedIn() {
      return AuthFactory.isLoggedIn();
    };
    function logout() {
      AuthFactory.removeToken();
      AlertsFactory.add('success', 'You are now logged out');
      $location.path('/');
    }
  }
]);