//To tell we are using angular
/*jslint white:true */
/*global angular */

angular.module('starter.mainInvCtrl', [])

.controller('mainInvCtrl', function ($scope, $state) {

            $scope.card = function (id) {
                $scope.companyState = 0;
                var akan = id;

                if (akan === 1) {
                    $scope.companyState = 1;
                    $state.go('company1')
                }
                if (akan === 2) {
                    $scope.companyState = 2;
                    $state.go('company2')
                }
                if (akan === 3) {
                    $scope.companyState = 3;
                    $state.go('company3')
                }
                if (akan === 4) {
                    $scope.state = 4;
                    $state.go('companyPage')
                }
                if (akan === 5) {
                    $scope.state = 5;
                    $state.go('companyPage')
                }
                else {
                console.log("controlleren mainInvestor virker ikke")
                }
            }
})
.controller('chatCtrl', function ($scope, $state) {

            $scope.chat = function () {
                    $state.go('UserMessages')
                }
})