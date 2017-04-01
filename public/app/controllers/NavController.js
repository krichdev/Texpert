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
      userType: '',
      profilePic: '',
    }

    // FUNCTIONS

    //navbar
    $scope.isLoggedIn = function() {
      return AuthFactory.isLoggedIn();
    };
    $scope.logout = function() {
      AuthFactory.removeToken();
      Materialize.toast('You have logged out', '2000');
      $scope.loginUser = { email: '', password: '' }; 
      $location.path('/');
    }

    // login
    $scope.userLogin = function () {
      UserFactory.userLogin($scope.loginUser)
      .then(
        function success(res) { loginSuccess(res); },
        function error (err) { errorMsg(err); }
      )
    }

    // signup
    $scope.userSignup = function() {
      UserFactory.userSignup($scope.user)
      .then(
        function success(res) {
          UserFactory.userLogin(res)
          .then (
            function success(res) { loginSuccess(res); },
            function error(err) { errorMsg(err); }
          )
        },
        function error(err) { errorMsg(err); }
      )
    }

    // helper functions
    // success login
    function loginSuccess(res) {
      console.log('res after fresh signup', res.data.user);
      console.log('id', res.data.user.id);
      AuthFactory.saveToken(res.data.token);
      AuthFactory.saveCurrentUserId(res.data.user.id);
      Materialize.toast('Successfully Logged in', '2000');
      $scope.showLogin = false;
      $state.go('allGurus');
    }
    // displays error message for 5 seconds
    function errorMsg(err) {
      Materialize.toast('An error occurred: ' + err.data.message, '5000');
    }

  }
]);
