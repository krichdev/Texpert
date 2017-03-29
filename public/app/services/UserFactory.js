angular
.module('TexpertApp')
.factory('UserFactory', [
  '$http',
  function($http) {
    return {
      // User stuff
      userLogin: function(userObject) {
        return $http.post('/api/auth', userObject);
      },
      userSignup: function(userObject) {
        return $http.post('/api/users', userObject);
      },
      getAllGurus: function(){
          return $http.get("/api/users/");
      },
      getGuru: function(id){
          return $http.get("/api/users/" + id)
      }





      // updateUser: function(id, userObject) {
      //   //return $http.put('/api/users' + id, userObject);
      // }

    }
  }
])
