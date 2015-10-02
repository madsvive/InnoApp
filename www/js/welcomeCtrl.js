//To tell we are using angular
/*jslint white:true */
/*global angular */

angular.module('starter.welcomeCtrl', [])

.controller('welcomeCtrl', function ($scope, $state) {
    $scope.welcomeInvestor = function () {
        $state.go('loginInvestor')
    }
    
    $scope.welcomeEnterprise = function () {   
        $state.go('loginEnterprise')
    }
})