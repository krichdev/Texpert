angular
.module('TexpertApp')
.controller('NavCtrl', [
  '$scope',
  '$state',
  '$location',
  '$window',
  'AuthFactory',
  'UserFactory',
  function($scope, $state, $location, $window, AuthFactory, UserFactory) {
    // VARIABLES
    $scope.isLoggedIn = isLoggedIn;

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

    // logged in user
    $scope.currentUser;
    $scope.currentUserInfo = {
      id: '',
      userType: ''
    };

    // runs on every page render
    if (isLoggedIn()) {
      $scope.currentUserInfo = JSON.parse($window.localStorage['currentUserInfo']);
      getUser();
    }


    // FUNCTIONS
    //navbar
    function isLoggedIn() {
      return AuthFactory.isLoggedIn();
    };
    $scope.logout = function() {
      AuthFactory.removeToken();
      Materialize.toast('You have logged out', '2000');
      clearUserData();
      $state.go('home');
    }
  
    // gets current user's db info
    function getUser() {
      UserFactory.getUser($scope.currentUserInfo.id)
      .then(
        function success(res) { $scope.currentUser = res.data; },
        function error(err){ errorMsg(err); }
      )
    }

    // login, takes email & password obj
    $scope.userLogin = function () {
      UserFactory.userLogin($scope.loginUser)
      .then(
        function success(res) { loginSuccess(res); },
        function error (err) { errorMsg(err); }
      )
    }

    // signup, creates an account and auto logs in
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
      $scope.currentUserInfo = {
        id: res.data.user.id,
        userType: res.data.user.userType
      };

      AuthFactory.saveToken(res.data.token);
      AuthFactory.saveCurrentUserInfo($scope.currentUserInfo);
      $scope.currentUserInfo = JSON.parse($window.localStorage['currentUserInfo']);
      getUser();
      Materialize.toast('Successfully Logged in', '2000');
      $state.go('allGurus');
    }
    // displays error message for 5 seconds
    function errorMsg(err) {
      Materialize.toast('An error occurred: ' + err.data.message, '5000');
    }

    function clearUserData() {
      $scope.loginUser = { email: '', password: '' }; 
      $scope.currentUserInfo = {};
      $scope.user = {};
    }

  }
]);
