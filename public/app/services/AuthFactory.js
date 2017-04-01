angular
.module('TexpertApp')
.factory('AuthFactory', [
  '$window',
  function($window) {

    return {
      saveToken:            saveToken,
      saveCurrentUserInfo:  saveCurrentUserInfo,
      getCurrentUserInfo:   getCurrentUserInfo,
      getToken:             getToken,
      removeToken:          removeToken,
      isLoggedIn:           isLoggedIn,
      currentUser:          currentUser
    }

    function saveToken(token) {
      $window.localStorage['secretToken'] = token;
    }
    // accepts id & userType as an Obj
    function saveCurrentUserInfo(userObj) {
      $window.localStorage['currentUserInfo'] = JSON.stringify(userObj);
    }
    function getCurrentUserInfo() {
      return $window.localStorage['currentUserInfo'];
    }
    function getToken() {
      return $window.localStorage['secretToken'];
    }
    function removeToken() {
      $window.localStorage.removeItem('secretToken');
      $window.localStorage.removeItem('currentUserId');
    }
    function isLoggedIn() {
      var token = this.getToken();

      return token ? true : false;
    }
    function currentUser() {
      if (this.isLoggedIn) {
        var token = this.getToken();

        try {
          var payload = JSON.parse($window.atob(token.split('.')[1]));
          console.log('authfactory currentUser() payload: ', payload)
          return payload;
        }
        catch(err) {
          console.log('error', err);
          return false;
        }
      }
      return false;
    }
  }
]);
