angular
.module('GenericApp')
.factory('AuthInterceptor', [
  'AuthFactory',
  function(AuthFactory) {
    return { request: request };

    function request(config) {
      var token = AuthFactory.getToken();

      if (token) {
        console.log('token found and adde to headers')
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    }
  }
])