angular
.module('TexpertApp')
.factory('MessageFactory', [
  '$http',
  function($http) {
    return {
      // Message stuff
      createMessage: function(messageObject) {
        return $http.post('/api/messages', messageObject);
      },
      getAllMessages: function(){
          return $http.get("/api/messages/");
      },
      getMessage: function(id){
          return $http.get("/api/messages/" + id)
      },
      // delete route

    }
  }
])
