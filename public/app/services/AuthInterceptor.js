angular
.module('GenericApp')
.factory('AuthInterceptor', [
  'AuthFactory',
  function(AuthFactory) {
    return { request: request };

    function request(config) {
      var token = AuthFactory.getToken();

      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config
    }
  }
])