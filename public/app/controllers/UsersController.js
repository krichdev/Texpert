angular
.module('GenericApp')
.controller('UsersController', [
  '$scope',
  '$state',
  '$stateParams',
  'AuthFactory',
  'UserFactory',
  function($scope, $state, $stateParams, AuthFactory, UserFactory) {

    // functions that are called on page render
    if ($state.current.name == 'profilePage') {
      // db call for a single user
      getGuru();
    } else if ($state.current.name == 'allGurus') {
      // db call for all gurus
      getAllUsers();
    } else {
      getUser();
    }


    // FUNCTIONS
    function getAllUsers() {
      UserFactory.getAllGurus()
      .then(
        function success(res){
          console.log('getting allGurus')
          $scope.gurus = res.data;
        },
        function error(err){
          console.log("Error", err);
        }
      )
    }

    function getUser() {
      $scope.user = AuthFactory.currentUser();
      console.log($scope.user);
    }

    function getGuru(){
      UserFactory.getGuru($stateParams.id)
      .then(
        function success(res) {
          $scope.guru = res.data;
          console.log(res.data)
        },
        function error(err){
          console.log(err);
        }
      )
    }

    function updateUser() {
      var id = $stateParams.id;
      console.log($state.current)
      //UserFactory.updateUser(id, )

    }


  }
])
