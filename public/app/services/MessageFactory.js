angular
.module('TexpertApp')
.factory('MessageFactory', [
  '$http',
  function($http) {

    return {
      // Message stuff
      createMessage: function(messageObj) {
        return $http.post('/api/messages', messageObj);
      },
      getAllMessages: function(){
        return $http.get("/api/messages/");
      },
      getMessage: function(id){
        return $http.get("/api/messages/" + id)
      },
      claimMessage: function(messageObj) {
        return $http.put('/api/messages/', messageObj);
      }
      // delete route

    }
  }
])
