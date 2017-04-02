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

    //runs on page render
    checkViewer();

    // FUNCTIONS
    function checkViewer() {
      // Only allows signed-in users to see Guru list
      if (!isLoggedIn()) {
        $state.go('home');
        Materialize.toast('You need to be logged in to see our excellent list of Texpert Gurus', 10000);
      } else { 
        //DB call to get required Info on page render
        getPageData();
      }
    }

    function isLoggedIn() {
      return AuthFactory.isLoggedIn();
    };

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