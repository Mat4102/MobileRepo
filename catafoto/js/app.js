// Ionic Starter App, v0.9.20
'use strict';
var app =angular.module('starter', ['ionic', 'starter.services','starter.controllers','ionic.contrib.ui.cards','ngCookies','ngResource','ngSanitize'])
.config(function($stateProvider, $urlRouterProvider,$locationProvider, $httpProvider) {
$httpProvider.responseInterceptors.push('httpInterceptor');
  $stateProvider
    .state('server', {
      url: '/server',
      templateUrl: 'templates/server.html',
    })
     .state('login', {
          url: '/login',
          templateUrl: 'templates/login.html'

        })
        .state('customerSearch', {
                  url: '/customerSearch',
                  templateUrl: 'templates/customerSearch.html',
                  controller: 'ServiceCliente'

                })

        .state('manual', {
                  url: '/manual',
                  templateUrl: 'templates/manual.html',
                })
      .state('catalogue', {
        url: '/catalogue',
        templateUrl: 'templates/catalogue.html',
        controller: 'IntroCtrl'
      })
      .state('article', {
              url: '/article',
              templateUrl: 'templates/articles.html',
              controller: 'IntroCtrl'
            })
  .state('main', {
    url: '/main',
    templateUrl: 'templates/main.html',
  })
   .state('variaty', {
            url: '/variaty',
            templateUrl: 'templates/variaty.html',
            controller: 'CardsCtrl'
           });
  $urlRouterProvider.otherwise('/login');

});
app.run(function (api) {
	api.init();
});

