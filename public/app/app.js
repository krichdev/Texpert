angular
.module('TexpertApp', ['ui.router', 'ui.materialize'])

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
    })
    .state('404', {
      url: '/404',
      templateUrl: 'app/views/404.html'
    })
    .state('allGurus', {
      url: '/users',
      templateUrl: 'app/views/allGurus.html',
      controller: 'AllUserCtrl'
    })
    .state('profilePage', {
      url: '/users/:id',
      templateUrl: 'app/views/singleUser.html',
      controller: 'SingleUserCtrl'
    })
    .state('profileUpdate', {
      url: '/users/update/:id',
      templateUrl: 'app/views/updateUser.html',
      controller: 'SingleUserCtrl'
    })
    .state('main', {
     url:'/main/main',
     templateUrl: 'app/views/main.html',
     controller: 'MainCtrl'
   })
   .state('join', {
     url:'/main/join' ,
     templateUrl: 'app/views/join.html',
     controller: 'JoinCtrl'
   })
   .state('chat', {
     url: '/chat/:id',
     templateUrl: 'app/views/main.html',
     controller: 'MainCtrl'
   })

    $locationProvider.html5Mode(true);

  }])
