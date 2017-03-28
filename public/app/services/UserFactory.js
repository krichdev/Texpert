angular
.module('GenericApp')
.factory('UserFactory', [
  '$http',
  function($http) {
    return {
      // User stuff
      userLogin: function(userObject) {
        return $http.post('/auth', userObject);
      },
      userSignup: function(userObject) {
        console.log('in factory', userObject);
        return $http.post('/users', userObject);
      },
    }
  }
])