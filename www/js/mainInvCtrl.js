//To tell we are using angular
/*jslint white:true */
/*global angular */

angular.module('starter.mainInvCtrl', [])

.controller('mainInvCtrl', function ($scope, $state) {

            $scope.card = function (id) {
                $scope.state = 0;
                var akan = id;
                
                if (akan === 1) {
                    $scope.state = 1;
                    $state.go('company1')
                }
                if (akan === 2) {
                    $scope.state = 2;
                    $state.go('company2')
                }
                if (akan === 3) {
                    $scope.state = 3;
                    $state.go('company3')
                }
                if (akan === 4) {
                    $scope.state = 4;
                    $state.go('company4')
                }
                if (akan === 5) {
                    $scope.state = 5;
                    $state.go('company5')
                }
                else {
                console.log("Lortet virker ikke")
                }
            }
})