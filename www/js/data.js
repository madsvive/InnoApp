//To tell we are using angular
/*jslint white:true */
/*global angular */

angular.module('starter.data', [])

.factory('CompanyList', function () {

    var companyList = [
        {
            name: "Taxa fyn A/S",
            logo: "/img/test.png",
            category: "Transport",
            subscription: "free",
            shortssummary: "...",
            longsummary: ".......",
            follow: 4,
            funding: "200.000 for 20%",
            team: ["Akan", "Mads", "Omar"],
            teamimg: /img/,
            budget: /budgets/,
            url: "http://www.virksomhed.dk/",
            facebook: "facebook.com/mads.vive/",
            linkedin: "linkedin.com/mads.vive/"
        },
        {
            name: "123 Opstart A/S ",
            logo: "/img/test.png",
            category: "Consulting",
            subscription: "Premium",
            shortssummary: "...",
            longsummary: ".......",
            follow: 0,
            funding: "200.000 for 5%",
            team: ["Akan", "Mads", "Omar"],
            teamimg: /img/,
            budget: /budgets/,
            url: "http://www.virksomhed.dk/",
            facebook: "facebook.com/mads.vive",
            linkedin: "linkedin.com/mads.vive"
        }, {
            name: "Habibib Café",
            logo: "/img/test.png",
            category: "Food",
            subscription: "Premium",
            shortssummary: "...",
            longsummary: ".......",
            follow: 7,
            funding: "200.000 for 5%",
            team: ["Akan", "Mads", "Omar"],
            teamimg: /img/,
            budget: /budgets/,
            url: "http://www.virksomhed.dk/",
            facebook: "facebook.com/mads.vive",
            linkedin: "linkedin.com/mads.vive"
        }, {
            name: "AG Web Design",
            logo: "/img/test.png",
            category: "IT",
            subscription: "Certified",
            shortssummary: "...",
            longsummary: ".......",
            follow: 2,
            funding: "200.000 for 5%",
            team: ["Akan", "Mads", "Omar"],
            teamimg: /img/,
            budget: /budgets/,
            url: "http://www.virksomhed.dk/",
            facebook: "facebook.com/mads.vive",
            linkedin: "linkedin.com/mads.vive"
        }, {
            name: "Gülsen invest",
            logo: "/img/test.png",
            category: "Finance",
            subscription: "KU",
            shortssummary: "...",
            longsummary: ".......",
            follow: 4,
            funding: "200.000 for 5%",
            team: ["Akan", "Mads", "Omar"],
            teamimg: /img/,
            budget: /budgets/,
            url: "http://www.virksomhed.dk/",
            facebook: "facebook.com/mads.vive",
            linkedin: "linkedin.com/mads.vive"
        }


      ];

    return {
        getAll: function () {
            return companyList;
        }
    }

})


.controller('CompanyCtrl', function ($scope, CompanyList) {

    $scope.listOfStuff = CompanyList.getAll();


})

.filter('lookup', function ($log) {
    return function (items, query) {
        if (!query) return items; // return all items if nothing in query box

        var terms = query.split(' ');
        var arrayToReturn = [];

        items.forEach(function (item) { // iterate through array of items

            var passTest = true;
            terms.forEach(function (term) { // iterate through terms found in query box
                // if any terms aren't found, passTest becomes and remains false
                passTest = passTest && (item.name.toLowerCase().indexOf(term.toLowerCase()) > -1) || (item.uni.toLowerCase().indexOf(term.toLowerCase()) > -1) || (item.title.toLowerCase().indexOf(term.toLowerCase()) > -1);
            });
            // Add item to return array only if passTest is true -- all search terms were found in item
            if (passTest) {
                arrayToReturn.push(item);
            }
        });

        //console.log(arrayToReturn);
        return arrayToReturn;
    }
});