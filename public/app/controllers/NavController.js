angular
.module('GenericApp')
.controller('NavCtrl', [
  '$scope',
  '$location',
  'AlertsFactory',
  'AuthFactory',
  function($scope, $location, AlertsFactory, AuthFactory) {
    // VARIABLES
    $scope.isLoggedIn = isLoggedIn;
    $scope.logout = logout;    
    $scope.showLogin = true;
    $scope.showSignup = false;
    $scope.toggleLogin = function() {
      console.log('clicked')
      $scope.showLogin = $scope.showLogin ? false : true;
    }
    $scope.toggleSignup = function() {
      $scope.showSignup = $scope.showSignup ? false : true;
    }

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