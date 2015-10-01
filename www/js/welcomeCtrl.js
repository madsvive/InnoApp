//To tell we are using angular
/*jslint white:true */
/*global angular */

angular.module('starter.welcomeCtrl', [])

.controller('welcomeCtrl', function ($scope, $state) {
    $scope.welcome = function () {
        $state.go('login')
    }
})