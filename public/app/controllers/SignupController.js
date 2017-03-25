angular
.module('GenericApp')
.controller('SignupCtrl', [
  '$scope',
  'UserFactory',
  'AlertsFactory',
  '$state',
  function($scope, UserFactory, AlertsFactory, $state) {
    // PUBLIC VARIABLES & FUNCTIONS
    $scope.user = user;
    $scope.userSignup = userSignup;
    
    //PRIVATE VARIABLES & FUNCTIONS
    var user = {
      email: '',
      password: ''
    }
    function userSignup() {
      console.log($scope.user)
      UserFactory.userSignup($scope.user)
      .then(
        function success(res) {
          $state.go('home');
        },
        function error(err) {
          AlertsFactory.add('error', err.data.message)
        }
      )
    }
  }
]);