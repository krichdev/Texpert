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
    $scope.currentUserId = AuthFactory.getCurrentUserId();

    $scope.getUser = getUser;
    $scope.getAllUsers = getAllUsers;
    $scope.updateUser = updateUser;

    // DB call to get required info based on page
    // called on page render
    getPageData()


    // FUNCTIONS
    //determines which userdata is required
    function getPageData () {
      getUser();
      
      if ($state.current.name == 'allGurus') {
        getAllUsers();
      }
    }

    function getAllUsers() {
      UserFactory.getAllUsers()
      .then(
        function success(res){
          console.log('getting allGurus');
          $scope.gurus = res.data;
        },
        function error(err){
          console.log("Error", err);
        }
      )
    }

    function getUser(){
      UserFactory.getUser($scope.currentUserId)
      .then(
        function success(res) {
          $scope.guru = res.data;
          console.log('got a guru: ', $scope.guru);
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
  }
])
