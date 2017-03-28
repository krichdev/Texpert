angular
.module('GenericApp')
.factory('UserFactory', [
  '$http',
  function($http) {
    return {
      // User stuff
      userLogin: function(userObject) {
        return $http.post('/api/auth', userObject);
      },
      userSignup: function(userObject) {
        console.log('in factory', userObject);
        return $http.post('/api/users', userObject);
      },
      allGurus: function(userObject) {
        return $http.get('/users', userObject)
      }
    }
  }
])
