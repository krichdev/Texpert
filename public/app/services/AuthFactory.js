angular
.module('GenericApp')
.factory('AuthFactory', [
  '$window',
  function($window) {

    return {
      saveToken:    saveToken,
      getToken:     getToken,
      removeToken:  removeToken,
      isLoggedIn:   isLoggedIn,
      currentUser:  currentUser
    }

    function saveToken(token) {
      $window.localStorage['secretToken'] = token;
    }
    function getToken() {
      return $window.localStorage['secretToken'];
    }
    function removeToken() {
      $window.localStorage.removeItem('secretToken');
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



