angular
.module('GenericApp')
.controller('LoginCtrl', [
  '$scope',
  'UserFactory',
  '$state',
  'AlertsFactory',
  'AuthFactory',
  function($scope, UserFactory, $state, AlertsFactory, AuthFactory) {
    // VARIABLES
    $scope.user = {
      email: '',
      password: ''
    };

    // FUNCTIONS
    $scope.userLogin = function () {
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


