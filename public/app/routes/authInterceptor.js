angular
.module('GenericApp')
.config([
  '$httpProvider',
  function($httpProvider) {
    console.log('intercepted!!!!!')
    $httpProvider.interceptors.push('AuthInterceptor');
  }
]);