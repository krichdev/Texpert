angular
.module('GenericApp')
.factory('UserFactory', [
  '$http',
  function($http) {
    return {
      userLogin: userLogin,
      userSignup: userSignup
    }

    function userLogin(userObject) {
      return $http.post('/auth', userObject);
    }
    function userSignup(userObject) {
      return $http.post('/users', userObject);
    }

  }
])