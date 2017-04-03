angular
.module('TexpertApp')
.controller('NavCtrl', [
  '$scope',
  '$state',
  '$location',
  '$window',
  'AuthFactory',
  'UserFactory',
  'MessageFactory',
  function($scope, $state, $location, $window, AuthFactory, UserFactory, MessageFactory) {
    
    // VARIABLES
    // public functions tied to private functions
    $scope.submitHelpRequest = submitHelpRequest;
    $scope.loggedIn;
    // login modal
    $scope.loginUser = {
      email:    '',
      password: ''
    };

    // signup modal
    $scope.user = {
      name:         '',
      email:        '',
      password:     '',
      userType:     '',
      profilePic:   '',
      mobile:       false,
      pc:           false,
      homeTheater:  false,
      printer:      false,
      homeRouter:   false,
      tv:           false,
    }

    // logged in user
    $scope.currentUser;
    $scope.currentUserInfo = {
      id:       '',
      userType: ''
    };

    // help request modal
    $scope.helpForm = {
      userName: '',
      userId: '',
      userPhoto: '',
      issueTitle: '',
      device: '',
      description: '',
      claimed: '',
      chatId: ''
    }

    // runs on every page render
    verifyUser();
    

    // FUNCTIONS
    function verifyUser() {
      $scope.userLoggedIn;
      
      if (isLoggedIn()) {
        $scope.currentUserInfo = JSON.parse($window.localStorage['currentUserInfo']);
        $scope.userLoggedIn = true;
        getUser();
      }
    }
    // help request modal
    function submitHelpRequest() {
      // add requester data to form
      $scope.helpForm.userName = $scope.currentUser.name;
      $scope.helpForm.userId = $scope.currentUser.id;
      $scope.helpForm.userPhoto = $scope.currentUser.profilePic;
      
      //POST request to db
      MessageFactory.createMessage($scope.helpForm)
      .then(
        function success(res) {
          $scope.helpForm = {};
          Materialize.toast('Your request has been pinned to the help board.\
            To see your help requests, go to your profile page', 10000);
        },
        function error(err) { errorMsg(err); }
      )
    }

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
         $scope.form = {};
         Materialize.toast('You\'re now signed up. You can now sign in', 7000);
        },
        function error(err) { errorMsg(err); }
      )
    }

    // success login
    function loginSuccess(res) {
      // saves response data
      $scope.currentUserInfo = {
        id: res.data.user.id,
        userType: res.data.user.userType
      };

      // save user token & other info in localStorage
      AuthFactory.saveToken(res.data.token);
      AuthFactory.saveCurrentUserInfo($scope.currentUserInfo);
      $scope.currentUserInfo = JSON.parse($window.localStorage['currentUserInfo']);
      
      getUser();
      Materialize.toast('Successfully Logged in', '2000');
      $state.go('allGurus');
    }

    // displays generic error message for 5 seconds
    function errorMsg(err) {
      Materialize.toast('An error occurred: ' + err.data.message, '5000');
    }

    function clearUserData() {
      $scope.loginUser = { email: '', password: '' }; 
      $scope.currentUserInfo = {};
      $scope.currentUser = {};
    }

  }
]);
