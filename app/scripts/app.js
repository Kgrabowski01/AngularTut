'use strict';
angular
  .module('YoutubeLibary', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngAria',
  	'ngStorage',
    'ngMaterial',
    'ngTable',
    'ngDraggable'
    //'youtubeServices',



  ])
  .config(function ($routeProvider,$sceDelegateProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
      //Whitelist yoyutube
      $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')]);
  });
