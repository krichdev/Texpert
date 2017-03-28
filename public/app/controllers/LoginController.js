angular
.module('GenericApp')
.controller('LoginCtrl', [
  '$scope',
  'UserFactory',
  '$state',
  'AlertsFactory',
  'AuthFactory',
  function($scope, UserFactory, $state, AlertsFactory, AuthFactory) {
    // PUBLIC VARIABLES & FUNCTIONS
    $scope.user = user;
    $scope.userLogin = userLogin;

    // PRIVATE VARIABLES & FUNCTIONS
    var user = {
      email: '',
      password: ''
    };

    function userLogin() {
      UserFactory.userLogin($scope.user)
      .then(
        function success (res) {
          console.log(res);
          AuthFactory.saveToken(res.data.token);
          AlertsFactory.add('success', 'You are now logged in!');
          $state.go('home');
        },
        function error (err) {
          AlertsFactory.add('error', err.data.message);
        }
      )
    }
  }
])


