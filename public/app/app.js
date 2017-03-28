angular
.module('GenericApp', ['ui.router'])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    //Routing
    $urlRouterProvider.otherwise('/404');

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl:'/app/views/home.html'
      // ,controller: 'HomeCtrl'
    })
    .state('404', {
      url: '/404',
      templateUrl: 'app/views/404.html'
    })
    .state('test', {
      url: '/users/:id',
      templateUrl: 'app/views/test.html',
      controller: 'Test'
    })
    .state('allGurus', {
      url: '/users',
      templateUrl: 'app/views/allGurus.html',
      controller: 'Test'
    })

    $locationProvider.html5Mode(true);

  }])
