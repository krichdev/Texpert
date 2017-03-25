angular
.module('GenericApp')
.config([
  '$httpProvider',
  function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  }
]);