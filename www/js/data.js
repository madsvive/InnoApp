//To tell we are using angular
/*jslint white:true */
/*global angular */

angular.module('starter.data', [])


/**/
.factory('CompanyList', function () {

    var companyList = [
        {
            name: "AG Solutions",
            logo: "img/ag.jpg",
            category: "IT",
            subscription: "CBS Certified",
            shortsummary: "Ønsker du din virksomhed på nettet? Så er du i trygge hænder hos AG-solutions...",
            longsummary: "Ønsker du din virksomhed på nettet? Så er du i trygge hænder hos AG-solutions. Vi tilbyder komplette webløsninger, skræddersyet efter dine behov og ønsker. AG-solutions startede i 2015 med en vision om at kunne levere komplette webløsninger til virksomheder i alle størrelser. Med en webside kan du reklamere for din forretning på en visuel & begribende måde, ved blot at have din smartphone ved hånden.",
            follow: 2,
            funding: "2.000.000 for 10%",
            goal: "1.200.000/2.000.000",
            team: ["Akan", "Mads", "Omar"],
            teamimg: /img/,
            budget: /budgets/,
            url: "http://www.virksomhed.dk/",
            facebook: "facebook.com/mads.vive",
            linkedin: "linkedin.com/mads.vive"
        }, {
            name: "Taxa fyn A/S",
            logo: "img/taxa.png",
            category: "Transport",
            subscription: "None",
            shortsummary: "Drive is a full-stack e-commerce platform for new car buyers and dealers, with backing from the top franchised dealerships across California...",
            longsummary: "Drive is a full-stack e-commerce platform for new car buyers and dealers, with backing from the top franchised dealerships across California. For new car buyers, Drive is the first and only technology platform that lets you complete the entire process online, with over 10,000 new cars in stock, direct online financing, leasing, and trade-ins, plus *free* delivery to your home or office. For franchised new car dealerships, Drive is a full-stack e-commerce solution that turbocharges the entire business: retail, F&I, trade-in, and service.",
            follow: 4,
            funding: "200.000 for 20%",
            goal: "20.000/200.000",
            team: ["Akan", "Mads", "Omar"],
            teamimg: /img/,
            budget: /budgets/,
            url: "http://www.virksomhed.dk/",
            facebook: "facebook.com/mads.vive/",
            linkedin: "linkedin.com/mads.vive/"
        },
        {
            name: "123 Opstart A/S ",
            logo: "img/consult.jpg",
            category: "Consulting",
            subscription: "Premium",
            shortsummary: "Imagine a tool that enabled the business owner or marketing consultant to manage their entire marketing efforts in one location, this is exactly what 123 Opstart is developing....",
            longsummary: "Imagine a tool that enabled the business owner or marketing consultant to manage their entire marketing efforts in one location, this is exactly what 123 Opstart is developing. This new tool will include a wide range of videos, podcasts, work flows, checklists and learning methodologies to allow either a business owner, marketing director or consultant to run their entire marketing effort from the one portal. It will include dashboards, planning tools, people management, marketing plans, case studies, reporting templates, and marketing training. Already there are 5 major organisations wanting this tool in their business, and Hunter has identified key people to deliver IT, architecture and high end production qualities for the contents. ",
            follow: 0,
            funding: "100.000 for 50%",
            goal: "110.000/100.000",
            team: ["Akan", "Mads", "Omar"],
            teamimg: /img/,
            budget: /budgets/,
            url: "http://www.virksomhed.dk/",
            facebook: "facebook.com/mads.vive",
            linkedin: "linkedin.com/mads.vive"
        }, {
            name: "Habibib Café",
            logo: "img/Cafe.jpg",
            category: "Food",
            subscription: "Premium",
            shortsummary: "We are a small artisan sourdough bakery, based in Levenshulme, Manchester, with a passion for beautiful food and sourdough bread!...",
            longsummary: "We are a small artisan sourdough bakery, based in Levenshulme, Manchester, with a passion for beautiful food and sourdough bread! We now have the opportunity to expand the cafe to make at least 20 more seats and create a fantastic cooking space. We also want to utilise the small outdoor area we have to make a lovely light, family friendly space for people to enjoy sitting in all seasons. We'll be using a local Levenshulme architect and creating more jobs for Manchester folk. We also plan to apply for an alcohol license to extend our opening times into the evening to provide a space to sit and drink, using local ales and organic wines.",
            follow: 7,
            funding: "300.000 for 5%",
            goal: "80.000/300.000",
            team: ["Akan", "Mads", "Omar"],
            teamimg: /img/,
            budget: /budgets/,
            url: "http://www.virksomhed.dk/",
            facebook: "facebook.com/mads.vive",
            linkedin: "linkedin.com/mads.vive"
        }, {
            name: "Angellist",
            logo: "img/angellist.png",
            category: "Crowdinvestment",
            subscription: "DTU Certified",
            shortsummary: "...",
            longsummary: ".......",
            follow: 4,
            funding: "600.000 for 49%",
            goal: "20.000/600.000",
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