angular
.module('TexpertApp')
.controller('HelpBoardCtrl', [
  '$scope',
  '$state',
  'AuthFactory',
  'MessageFactory',
  'UserFactory',
  function($scope, $state, AuthFactory, MessageFactory, UserFactory) {
    
    // VARIABLES
    $scope.allMessages;
    
    $scope.currentUserInfo = {
      id: '',
      userType: '',
    };


    // Runs on page render
    verifyUser();





    // FUNCTIONS
    function verifyUser() {
      // Only allows signed-in users to see Guru list
      if (!AuthFactory.isLoggedIn()) {
        $state.go('home');
        Materialize.toast('You need to be logged in to see this page', 10000);
      } else { 
        //DB call to get required Info on page render
        getPageData();
      }
    }
    function getPageData() {
      // get basic user info
      $scope.currentUserInfo = JSON.parse(AuthFactory.getCurrentUserInfo());
      
      // db call to load all messages
      MessageFactory.getAllMessages()
      .then(
        function success(res) {
          console.log(res);
        },
        function error(err) {
          console.log(err);
        }
      )
    }





  }
]);