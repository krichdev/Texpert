angular
.module('TexpertApp')
.controller('NavCtrl', [
  '$scope',
  '$state',
  '$location',
  'AuthFactory',
  'UserFactory',
  function($scope, $state, $location, AuthFactory, UserFactory) {
    // VARIABLES

    // login
    $scope.loginUser = {
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
    $scope.isLoggedIn = function() {
      return AuthFactory.isLoggedIn();
    };
    $scope.logout = function() {
      AuthFactory.removeToken();
      Materialize.toast('You have logged out');
      $location.path('/');
      $scope.loginUser = {
        email: '',
        password: ''
      }; 
    }

    // login
    $scope.userLogin = function () {
      UserFactory.userLogin($scope.loginUser)
      .then(
        function success (res) {
          var userId = res.data.user.id;
          AuthFactory.saveToken(res.data.token);
          Materialize.toast('Successfully Logged in', '2000');
          $scope.showLogin = false;
          $state.go('allGurus', {id: userId});
        },
        function error (err) {
          errorMsg();
        }
      )
    }

    // signup
    $scope.userSignup = function() {
      UserFactory.userSignup($scope.user)
      .then(
        function success(res) {
          autoLoginAfterSignup();
        },
        function error(err) {
          errorMsg();
        }
      )
    }

    // auto logs in user after signing up
    function autoLoginAfterSignup() {
      UserFactory.userLogin($scope.user)
      .then(
        function success (res) {
          AuthFactory.saveToken(res.data.token);
          Materialize.toast('Successfully Logged in', '2000');
          $state.go('home');
        },
        function error (err) {
          errorMsg();
        }
      )
    }

    // displays error message for 5 seconds
    function errorMsg() {
      Materialize.toast('An error occurred: ' + err.data.message, '5000');
    }

  }
]);
