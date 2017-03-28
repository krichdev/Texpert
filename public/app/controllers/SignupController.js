angular
.module('GenericApp')
.controller('SignupCtrl', [
  '$scope',
  'UserFactory',
  'AlertsFactory',
  '$state',
  function($scope, UserFactory, AlertsFactory, $state) {
    // variables
    $scope.user = {
      email: '',
      password: '',
      skills: [
        { mobile: false },
        { pc: false },
        { homeTheater: false },
        { printer: false },
        { homeRouter: false },
        { tv: false }
      ],
      userType: ''
    },

    // Functions
    $scope.userSignup = function() {
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
    $scope.addSkill = function(skill) {
      var skillIndex = skill;

      if ($scope.user.skills[skillIndex].type) {
        $scope.user.skills[skillIndex].type = false
      } else {
        $scope.user.skills[skillIndex].type = true;
      }
    }
  }
]);
