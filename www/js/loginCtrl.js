angular.module('starter.loginCtrl', [])

.controller('loginCtrl', function ($scope, $state) {
    $scope.loginInvestor = function () {
        //Her skal login for investorer verificeres og state'en som man så skal sendes til er virksomhedsoversigten
        $state.go('xx')
    }

    $scope.loginEnterprise = function () {
        //Her skal login for enterprise verificeres og state'en som man så skal sendes til er ?virksomhedsprofilen? 
        $state.go('xx')
    }

    $scope.signupEnterprise = function () {
        $state.go('signupEnterprise')
    }

    $scope.signupInvestor = function () {
        $state.go('signupInvestor')
    }
})