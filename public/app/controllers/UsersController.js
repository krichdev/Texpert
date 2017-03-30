angular
.module('TexpertApp')
.controller('UsersController', [
  '$scope',
  '$state',
  '$stateParams',
  'AuthFactory',
  'UserFactory',
  function($scope, $state, $stateParams, AuthFactory, UserFactory) {

    // VARIABLES
    $scope.guru;
    $scope.gurus;
    $scope.currentUser;

    $scope.getUser = getUser;
    $scope.getGuru = getGuru;
    $scope.getAllUsers = getAllUsers;
    $scope.updateUser = updateUser;

    $scope.select = {
      value: "Option1",
       choices: ["Option1", "I'm an option", "This is materialize", "No, this is Patrick."]
    };

    // functions that are called on page render
    // TO BE FIXED when better understanding of
    // who has access to what pages
    getUser();
    
    if ($state.current.name == 'profilePage') {
      // db call for a single user
      getGuru();
    } else if ($state.current.name == 'allGurus') {
      // db call for all gurus
      getAllUsers();

    } else if ($state.current.name == 'profileUpdate') {
      getGuru();
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
      $scope.currentUser = AuthFactory.currentUser();
      console.log('got a user: ', $scope.currentUser);
    }

    function getGuru(){
      UserFactory.getGuru($scope.currentUser.id)
      .then(
        function success(res) {
          $scope.guru = res.data
          console.log('got a guru: ', $scope.guru)
        },
        function error(err){
          console.log(err);
        }
      )
    }

    function updateUser() {
      var id = $stateParams.id;
      UserFactory.updateUser(id, $scope.guru)
      .then(
        function success(res) {
        $state.go('profilePage', {id: id});
        },
        function error(err) {
          console.log('error', err);
        }
      )

    }

    $scope.createRoom = function(){
      console.log('create room clicked');
    }

  }
])
