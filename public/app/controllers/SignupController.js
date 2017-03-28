angular
.module('GenericApp')
.controller('SignupCtrl', [
  '$scope',
  'UserFactory',
  'AlertsFactory',
  '$state',
  function($scope, UserFactory, AlertsFactory, $state) {
    // VARIABLES
    // $scope.user = {
    //   email: '',
    //   password: ''
    // },

    $scope.user = {
      email: '',
      password: '',
      skills: [
        {
          type: false,
          skill: 'mobile'
        },
        {
          type: false,
          skill: 'pc'
        },
        {
          type: false,
          skill: 'homeTheater'
        },
        {
          type: false,
          skill: 'printer'
        },
        {
          type: false,
          skill: 'homeRouter'
        },
        {
          type: false,
          skill: 'tv'
        }
      ],
      userType: ''
    },



    // Functions
    $scope.userSignup = function() {
      console.log($scope.user)
      UserFactory.userSignup($scope.user)
      .then(
        function success(res) {
          $state.go('home');
          console.log('success, user: ', $scope.user)
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
