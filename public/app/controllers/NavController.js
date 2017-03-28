angular
.module('GenericApp')
.controller('NavCtrl', [
  '$scope',
  '$location',
  'AlertsFactory',
  'AuthFactory',
  function($scope, $location, AlertsFactory, AuthFactory) {
    // VARIABLES
    $scope.showLogin = false;
    $scope.showSignup = false;

    // FUNCTIONS
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
    $scope.isLoggedIn = function() {
      return AuthFactory.isLoggedIn();
    };
    $scope.logout = function() {
      AuthFactory.removeToken();
      AlertsFactory.add('success', 'You are now logged out');
      $location.path('/');
    }
  }
]);