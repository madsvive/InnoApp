// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

//To tell we are using angular
/*jslint white:true */
/*global angular */

angular.module('starter', ['ionic', 'starter.welcomeCtrl', 'starter.loginCtrl'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

/*
This is our config where we define our states, so that vi kan control rendering and navigation
 */

.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('welcome', {
            url: '/welcome',
            templateUrl: 'templates/welcome.html',
            controller: 'welcomeCtrl'
        })
        .state('loginInvestor', {
            url: '/loginInvestor',
            templateUrl: 'templates/loginInvestor.html',
            controller: 'loginCtrl'
        })
        .state('loginEnterprise', {
            url: '/loginEnterprise',
            templateUrl: 'templates/loginEnterprise.html',
            controller: 'loginCtrl'
        })
        .state('signupEnterprise', {
            url: '/signupEnterprise',
            templateUrl: 'templates/signupEnterprise.html',
            controller: 'loginCtrl'
        })
        .state('signupInvestor', {
            url: '/signupInvestor',
            templateUrl: 'templates/signupInvestor.html',
            controller: 'loginCtrl'
        })
    $urlRouterProvider.otherwise('/welcome')
})