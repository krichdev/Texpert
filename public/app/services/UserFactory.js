angular
.module('TexpertApp')
.factory('UserFactory', [
  '$http', '$state',
  function($http, $state) {
    return {
      // User stuff
      userLogin: function(userObject) {
        return $http.post('/api/auth', userObject);
      },
      userSignup: function(userObject) {
        return $http.post('/api/users', userObject);
      },
      getAllUsers: function(){
          return $http.get("/api/users/");
      },
      getUser: function(id){
          return $http.get("/api/users/" + id)
      },
      updateUser: function(id, userObject) {
        return $http.put('/api/users/' + id, userObject);
      }

    }
  }
])
