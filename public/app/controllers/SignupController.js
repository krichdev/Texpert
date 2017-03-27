angular
.module('GenericApp')
.controller('SignupCtrl', [
  '$scope',
  'UserFactory',
  'AlertsFactory',
  '$state',
  function($scope, UserFactory, AlertsFactory, $state) {
    // VARIABLES
    $scope.user = {
      email: '',
      password: ''
    },
    
    $scope.guru = {
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
      ]
    },


    // Functions
    $scope.userSignup = function() {
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
    $scope.addSkill = function(skill) {
      var skillIndex = skill;
      $scope.guru.skills[skillIndex].type = true;
    }

  }
]);
