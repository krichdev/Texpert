angular
.module('TexpertApp')
.factory('AuthFactory', [
  '$window',
  function($window) {

    return {
      saveToken:          saveToken,
      saveCurrentUserId:  saveCurrentUserId,
      getCurrentUserId:   getCurrentUserId,
      getToken:           getToken,
      removeToken:        removeToken,
      isLoggedIn:         isLoggedIn,
      currentUser:        currentUser
    }

    function saveToken(token) {
      $window.localStorage['secretToken'] = token;
    }
    function saveCurrentUserId(id) {
      console.log('id in factory', id)
      $window.localStorage['currentUserId'] = id;
    }
    function getCurrentUserId() {
      return $window.localStorage['currentUserId'];
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
