//To tell we are using angular
/*jslint white:true */
/*global angular */

angular.module('starter.loginCtrl', [])

.controller('loginCtrl', function ($scope, $state) {
    $scope.loginInvestor = function () {
        //Her skal login for investorer verificeres og state'en som man så skal sendes til er virksomhedsoversigten

        //Firebase code to login a user
        //var ref = new Firebase("https://innoappxb02.firebaseio.com");
        //ref.authWithPassword({
        //  email    : "bobtony@firebase.com",
        //  password : "correcthorsebatterystaple"
        //}, function(error, authData) {
        //  if (error) {
        //    console.log("Login Failed!", error);
        //  } else {
        //    console.log("Authenticated successfully with payload:", authData);
        //  }
        //});
        $state.go('mainInvestor')
    }

    $scope.loginEnterprise = function () {
        //Her skal login for enterprise verificeres og state'en som man så skal sendes til er ?virksomhedsprofilen?
        $state.go('mainCompany')
    }

    $scope.signupEnterprise = function () {
        $state.go('signupEnterprise')
    }

    $scope.signupInvestor = function () {
        $state.go('signupInvestor')
    }
})
