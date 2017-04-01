angular
.module('TexpertApp')
.controller('AllUserCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  'AuthFactory',
  'UserFactory',
  function($scope, $state, $stateParams, AuthFactory, UserFactory) {
    
    // VARIABLES
    $scope.guru;
    $scope.gurus;
    $scope.currentUserId;

    //DB call to get required Info on page render
    startFunction();

    function startFunction() {
      $scope.currentUserId = AuthFactory.getCurrentUserId();
      getUser();
      getAllUsers();
    }

    function getAllUsers() {
      UserFactory.getAllUsers()
      .then(
        function success(res){
          $scope.gurus = res.data;
        },
        function error(err){
          errorMsg(err);
        }
      )
    }
    function getUser() {
      UserFactory.getUser($scope.currentUserId)
      .then(
        function success(res) {
          $scope.guru = res.data;
        },
        function error(err){
          errorMsg(err);
        }
      )
    }
    function errorMsg(err) {
      Materialize.toast('Sorry, an error occured', err);
    }
  }

])