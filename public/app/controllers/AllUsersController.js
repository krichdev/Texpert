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
    $scope.currentUserInfo = {
      id: '',
      userType: ''
    };

    //DB call to get required Info on page render
    getPageData();

    // FUNCTIONS
    function getPageData() {
      $scope.currentUserInfo = JSON.parse(AuthFactory.getCurrentUserInfo());
      getUser();
      getAllUsers();
    }

    function getAllUsers() {
      UserFactory.getAllUsers()
      .then(
        function success(res){ $scope.gurus = res.data; },
        function error(err){ errorMsg(err); }
      )
    }


    // gets current User's db info
    function getUser() {
      UserFactory.getUser($scope.currentUserInfo.id)
      .then(
        function success(res) { $scope.guru = res.data; },
        function error(err){ errorMsg(err); }
      )
    }

    function errorMsg(err) {
      Materialize.toast('Sorry, an error occured', err);
    }
  }

])