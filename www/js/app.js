// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

//To tell we are using angular
/*jslint white:true */
/*global angular */

angular.module('starter', ['ionic', /*'Firebase',*/ 'starter.welcomeCtrl', 'starter.loginCtrl', 'starter.data', 'starter.mainInvCtrl', 'monospaced.elastic', 'angularMoment' /*,'starter.signupCtrl'*/ ])

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
        .state('mainInvestor', {
            url: '/mainInvestor',
            templateUrl: 'templates/mainInvestor.html',
            controller: 'mainInvCtrl'
        })
        .state('companyPage', {
            url: '/companyPage',
            templateUrl: 'templates/companyPage.html',
            controller: 'mainInvCtrl'
        })
        .state('mainCompany', {
            url: '/mainCompany',
            templateUrl: 'templates/mainCompany.html',
            controller: 'chatCtrl'
        })
        .state('company1', {
            url: '/company1',
            templateUrl: 'templates/company&investor/company1.html'
        })
        .state('company2', {
            url: '/company2',
            templateUrl: 'templates/company&investor/company2.html'
        })
        .state('company3', {
            url: '/company3',
            templateUrl: 'templates/company&investor/company3.html'

        })
        .state('investor1', {
            url: '/investor1',
            templateUrl: 'templates/company&investor/investor1.html'
        })
        .state('investor2', {
            url: '/investor2',
            templateUrl: 'templates/company&investor/investor2.html'
        })
        .state('investor3', {
            url: '/investor3',
            templateUrl: 'templates/company&investor/investor3.html'
        })
        .state('UserMessages', {
            url: '/UserMessages',
            templateUrl: 'templates/UserMessages.html',
            controller: 'UserMessagesCtrl'
        });

    $urlRouterProvider.otherwise('/welcome')
})

/*This is for the chat*/
.controller('UserMessagesCtrl', ['$scope', '$rootScope', '$state',
  '$stateParams', 'MockService', '$ionicActionSheet',
  '$ionicPopup', '$ionicScrollDelegate', '$timeout', '$interval',
  function($scope, $rootScope, $state, $stateParams, MockService,
    $ionicActionSheet,
    $ionicPopup, $ionicScrollDelegate, $timeout, $interval) {

    // mock acquiring data via $stateParams
    $scope.toUser = {
      _id: '534b8e5aaa5e7afc1b23e69b',
      pic: 'http://ag-solutions.dk/img/team/Akan.jpg',
      username: 'Akan'
    }

    // this could be on $rootScope rather than in $stateParams
    $scope.user = {
      _id: '534b8fb2aa5e7afc1b23e69c',
      pic: 'http://faxekondicamp.dk/img/team/Mads.jpg',
      username: 'Mads'
    };

    $scope.input = {
      message: localStorage['userMessage-' + $scope.toUser._id] || ''
    };

    var messageCheckTimer;

    var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
    var footerBar; // gets set in $ionicView.enter
    var scroller;
    var txtInput; // ^^^

    $scope.$on('$ionicView.enter', function() {
      console.log('UserMessages $ionicView.enter');

      getMessages();
      
      $timeout(function() {
        footerBar = document.body.querySelector('#userMessagesView .bar-footer');
        scroller = document.body.querySelector('#userMessagesView .scroll-content');
        txtInput = angular.element(footerBar.querySelector('textarea'));
      }, 0);

      messageCheckTimer = $interval(function() {
        // here you could check for new messages if your app doesn't use push notifications or user disabled them
      }, 20000);
    });

    $scope.$on('$ionicView.leave', function() {
      console.log('leaving UserMessages view, destroying interval');
      // Make sure that the interval is destroyed
      if (angular.isDefined(messageCheckTimer)) {
        $interval.cancel(messageCheckTimer);
        messageCheckTimer = undefined;
      }
    });

    $scope.$on('$ionicView.beforeLeave', function() {
      if (!$scope.input.message || $scope.input.message === '') {
        localStorage.removeItem('userMessage-' + $scope.toUser._id);
      }
    });

    function getMessages() {
      // the service is mock but you would probably pass the toUser's GUID here
      MockService.getUserMessages({
        toUserId: $scope.toUser._id
      }).then(function(data) {
        $scope.doneLoading = true;
        $scope.messages = data.messages;

        $timeout(function() {
          viewScroll.scrollBottom();
        }, 0);
      });
    }

    $scope.$watch('input.message', function(newValue, oldValue) {
      console.log('input.message $watch, newValue ' + newValue);
      if (!newValue) newValue = '';
      localStorage['userMessage-' + $scope.toUser._id] = newValue;
    });

    $scope.sendMessage = function(sendMessageForm) {
      var message = {
        toId: $scope.toUser._id,
        text: $scope.input.message
      };

      // if you do a web service call this will be needed as well as before the viewScroll calls
      // you can't see the effect of this in the browser it needs to be used on a real device
      // for some reason the one time blur event is not firing in the browser but does on devices
      keepKeyboardOpen();
      
      //MockService.sendMessage(message).then(function(data) {
      $scope.input.message = '';

      message._id = new Date().getTime(); // :~)
      message.date = new Date();
      message.username = $scope.user.username;
      message.userId = $scope.user._id;
      message.pic = $scope.user.picture;

      $scope.messages.push(message);

      $timeout(function() {
        keepKeyboardOpen();
        viewScroll.scrollBottom(true);
      }, 0);

      $timeout(function() {
        $scope.messages.push(MockService.getMockMessage());
        keepKeyboardOpen();
        viewScroll.scrollBottom(true);
      }, 2000);

      //});
    };
    
    // this keeps the keyboard open on a device only after sending a message, it is non obtrusive
    function keepKeyboardOpen() {
      console.log('keepKeyboardOpen');
      txtInput.one('blur', function() {
        console.log('textarea blur, focus back on it');
        txtInput[0].focus();
      });
    }

    $scope.onMessageHold = function(e, itemIndex, message) {
      console.log('onMessageHold');
      console.log('message: ' + JSON.stringify(message, null, 2));
      $ionicActionSheet.show({
        buttons: [{
          text: 'Copy Text'
        }, {
          text: 'Delete Message'
        }],
        buttonClicked: function(index) {
          switch (index) {
            case 0: // Copy Text
              //cordova.plugins.clipboard.copy(message.text);

              break;
            case 1: // Delete
              // no server side secrets here :~)
              $scope.messages.splice(itemIndex, 1);
              $timeout(function() {
                viewScroll.resize();
              }, 0);

              break;
          }
          
          return true;
        }
      });
    };

    // this prob seems weird here but I have reasons for this in my app, secret!
    $scope.viewProfile = function(msg) {
      if (msg.userId === $scope.user._id) {
        // go to your profile
      } else {
        // go to other users profile
      }
    };
    
    // I emit this event from the monospaced.elastic directive, read line 480
    $scope.$on('taResize', function(e, ta) {
      console.log('taResize');
      if (!ta) return;
      
      var taHeight = ta[0].offsetHeight;
      console.log('taHeight: ' + taHeight);
      
      if (!footerBar) return;
      
      var newFooterHeight = taHeight + 10;
      newFooterHeight = (newFooterHeight > 44) ? newFooterHeight : 44;
      
      footerBar.style.height = newFooterHeight + 'px';
      scroller.style.bottom = newFooterHeight + 'px'; 
    });

}])

// services
.factory('MockService', ['$http', '$q',
  function($http, $q) {
    var me = {};

    me.getUserMessages = function(d) {
      /*
      var endpoint =
        'http://www.mocky.io/v2/547cf341501c337f0c9a63fd?callback=JSON_CALLBACK';
      return $http.jsonp(endpoint).then(function(response) {
        return response.data;
      }, function(err) {
        console.log('get user messages error, err: ' + JSON.stringify(
          err, null, 2));
      });
      */
      var deferred = $q.defer();
      
		 setTimeout(function() {
      	deferred.resolve(getMockMessages());
	    }, 1500);
      
      return deferred.promise;
    };

    me.getMockMessage = function() {
      return {
        userId: '534b8e5aaa5e7afc1b23e69b',
        date: new Date(),
        text: 'This is a test respond-message from Funder. Have a nice day!'
      };
    }

    return me;
  }
])

// fitlers
.filter('nl2br', ['$filter',
  function($filter) {
    return function(data) {
      if (!data) return data;
      return data.replace(/\n\r?/g, '<br />');
    };
  }
])

// directives
.directive('autolinker', ['$timeout',
  function($timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        $timeout(function() {
          var eleHtml = element.html();

          if (eleHtml === '') {
            return false;
          }

          var text = Autolinker.link(eleHtml, {
            className: 'autolinker',
            newWindow: false
          });

          element.html(text);

          var autolinks = element[0].getElementsByClassName('autolinker');

          for (var i = 0; i < autolinks.length; i++) {
            angular.element(autolinks[i]).bind('click', function(e) {
              var href = e.target.href;
              console.log('autolinkClick, href: ' + href);

              if (href) {
                //window.open(href, '_system');
                window.open(href, '_blank');
              }

              e.preventDefault();
              return false;
            });
          }
        }, 0);
      }
    }
  }
])

function onProfilePicError(ele) {
  this.ele.src = ''; // set a fallback
}

function getMockMessages() {
  return {"messages":[{"_id":"535d625f898df4e80e2a125e","text":"Funder has changed the game for finding investment.","userId":"534b8fb2aa5e7afc1b23e69c","date":"2014-04-27T20:02:39.082Z","read":true,"readDate":"2014-12-01T06:27:37.944Z"},{"_id":"535f13ffee3b2a68112b9fc0","text":"I like Funder better than ice cream!","userId":"534b8e5aaa5e7afc1b23e69b","date":"2014-04-29T02:52:47.706Z","read":true,"readDate":"2014-12-01T06:27:37.944Z"},{"_id":"546a5843fd4c5d581efa263a","text":"It is some amazing work you have been doing.","userId":"534b8fb2aa5e7afc1b23e69c","date":"2014-11-17T20:19:15.289Z","read":true,"readDate":"2014-12-01T06:27:38.328Z"},{"_id":"54764399ab43d1d4113abfd1","text":"Thanks dude.","userId":"534b8e5aaa5e7afc1b23e69b","date":"2014-11-26T21:18:17.591Z","read":true,"readDate":"2014-12-01T06:27:38.337Z"},{"_id":"547643aeab43d1d4113abfd2","text":"It is like magic!","userId":"534b8fb2aa5e7afc1b23e69c","date":"2014-11-26T21:18:38.549Z","read":true,"readDate":"2014-12-01T06:27:38.338Z"},{"_id":"547815dbab43d1d4113abfef","text":"Gee wiz, this is something special.","userId":"534b8e5aaa5e7afc1b23e69b","date":"2014-11-28T06:27:40.001Z","read":true,"readDate":"2014-12-01T06:27:38.338Z"},{"_id":"54781c69ab43d1d4113abff0","text":"I also think I like Funder more than I like ice cream!","userId":"534b8fb2aa5e7afc1b23e69c","date":"2014-11-28T06:55:37.350Z","read":true,"readDate":"2014-12-01T06:27:38.338Z"},{"_id":"54781ca4ab43d1d4113abff1","text":"Yea, it's pretty sweet","userId":"534b8e5aaa5e7afc1b23e69b","date":"2014-11-28T06:56:36.472Z","read":true,"readDate":"2014-12-01T06:27:38.338Z"},{"_id":"54781ca4ab43d1d4113abff1","text":"Try, to write me a message. I will reply you right away!","userId":"534b8e5aaa5e7afc1b23e69b","date":"2014-11-29T06:56:36.472Z","read":true,"readDate":"2014-12-01T06:27:38.338Z"}],"unread":0};
}

// configure moment relative time
moment.locale('en', {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "%d sec",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years"
  }
});

/*
 * angular-elastic v2.4.2
 * (c) 2014 Monospaced http://monospaced.com
 * License: MIT
 */
/*
 This is for the sidemenu to function
 */
function ContentController($scope, $ionicSideMenuDelegate) {
    $scope.toggleLeft = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };
}