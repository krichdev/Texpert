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
    $scope.showLogin = false;
    $scope.showSignup = false;

    $scope.toggleLogin = function() {
      $scope.showLogin = $scope.showLogin ? false : true;
      if ($scope.showSignup) {
        $scope.showSignup = false;
      }
    }
    $scope.toggleSignup = function() {
      $scope.showSignup = $scope.showSignup ? false : true;
      if ($scope.showLogin) {
        $scope.showLogin = false;
      }
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