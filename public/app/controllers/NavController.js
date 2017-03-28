angular
.module('GenericApp')
.controller('NavCtrl', [
  '$scope',
  '$state',
  '$location',
  'AlertsFactory',
  'AuthFactory',
  'UserFactory',
  function($scope, $state, $location, AlertsFactory, AuthFactory, UserFactory) {
    // VARIABLES
    //nav bar
    $scope.showLogin = false;
    $scope.showSignup = false;

    // login
    $scope.user = {
      email: '',
      password: ''
    };

    // signup
    $scope.user = {
      name: '',
      email: '',
      password: '',
      mobile: false,
      pc: false,
      homeTheater: false,
      printer: false,
      homeRouter: false,
      tv: false,
      userType: ''
    },

    // FUNCTIONS

    //navbar
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

    // login
    $scope.userLogin = function () {
      UserFactory.userLogin($scope.user)
      .then(
        function success (res) {
          AuthFactory.saveToken(res.data.token);
          AlertsFactory.add('success', 'You are now logged in!');
          $scope.showLogin = false;
        },
        function error (err) {
          AlertsFactory.add('error', err.data.message);
        }
      )
    }

    // signup
    $scope.userSignup = function() {
      UserFactory.userSignup($scope.user)
      .then(
        function success(res) {
          $scope.autoLoginAfterSignup();
        },
        function error(err) {
          AlertsFactory.add('error', err.data.message)
        }
      )
    }
    $scope.autoLoginAfterSignup = function() {
      UserFactory.userLogin($scope.user)
      .then(
        function success (res) {
          console.log(res);
          AuthFactory.saveToken(res.data.token);
          AlertsFactory.add('success', 'You are now logged in!');
          $scope.showSignup = false;
        },
        function error (err) {
          AlertsFactory.add('error', err.data.message);
        }
      )
    }
  }
]);
