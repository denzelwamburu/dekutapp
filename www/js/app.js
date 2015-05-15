// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('dekutapp', ['dekutapp.account','dekutapp.dev','dekutapp.home','dekutapp.login','dekutapp.register','dekutapp.tweet', 'ionic','lbServices','bd.timedistance', 'ngCordova', 'rssappControllers'])

    /*.run(function ($ionicPlatform) {
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
     })*/

    .run(function (User, $ionicPlatform, $rootScope, $location) {
        //Check if User is authenticated
        if (User.getCachedCurrent() == null) {
            User.getCurrent();
        }
    	//EDIT THESE LINES
		//Title of the blog
		$rootScope.TITLE = "Raymond Camden's Blog";
		//RSS url
		$rootScope.RSS = "http://www.raymondcamden.com/rss.cfm";

		$rootScope.goHome = function() {
			$location.path('/entries');
		};
    
    })

.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })
                 .state('news', {
                url: '/news',
                templateUrl: 'templates/land-news.html'
            })
        .state('Entries', {
				url: '/entries', 
				controller: 'EntriesCtrl', 
				templateUrl: 'templates/entries.html',
			})
			.state('Entry', {
				url: '/entry/:index',
				controller: 'EntryCtrl', 
				templateUrl: 'templates/entry.html',
			})

        .state('intro', {
                url: '/intro',
                templateUrl: 'templates/intro.html'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'templates/register.html',
                controller: 'RegisterCtrl'
            })
        .state('tour', {
            url: "/tour",
            abstract: true,
            templateUrl: "templates/tour.html"
        })
.state('tour.home', {
            url: '',
            views: {
                'tour-home': {
                    templateUrl: 'templates/tour-home.html'

                }
            }
        })
    .state('tour.about', {
            url: '/about',
            views: {
                'tour-about': {
                    templateUrl: 'templates/tour-about.html'

                }
            }
        })
        .state('tour.map', {
            url: '/map',
            views: {
                'tour-map': {
                    templateUrl: 'templates/tour-map.html',
                     controller: 'MapCtrl'
                  

                }
            }
        })
       .state('tour.facilities', {
            url: '/facilities',
            views: {
                'tour-facilities': {
                    templateUrl: 'templates/tour-facilities.html'

                }
            }
        })
    //Home after Login
.state('land', {
            url: "/land",
            abstract: true,
            templateUrl: "templates/land.html"
        })
.state('land.home', {
            url: '',
            views: {
                'land-home': {
                    templateUrl: 'templates/land-home.html'

                }
            }
        })
    .state('land.news', {
            url: '/news',
            views: {
                'land-news': {
                    templateUrl: 'templates/land-news.html'

                }
            }
        })
 .state('land.notices', {
            url: '/notices',
            views: {
                'land-notices': {
                    templateUrl: 'templates/land-notices.html'

                }
            }
        })

            .state('tabs', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })
            .state('tabs.home', {
                url: '/home',
                views: {
                    'home-tab': {
                        templateUrl: 'templates/home.html',
                        controller: 'HomeTabCtrl'
                    }
                }
            })
            .state('tabs.tweet', {
                url: '/tweet/:id',
                views: {
                    'home-tab': {
                        templateUrl: 'templates/tweet.html',
                        controller: 'TweetCtrl'
                    }
                }
            })
            .state('tabs.dev', {
                url: '/dev',
                views: {
                    'dev-tab': {
                        templateUrl: 'templates/dev.html',
                        controller: 'DevCtrl'
                    }
                }
            })
            .state('tabs.account', {
                url: '/account',
                views: {
                    'account-tab': {
                        templateUrl: 'templates/account.html',
                        controller: 'AccountCtrl'
                    }
                }
            });

        $urlRouterProvider.otherwise('/intro');

        $httpProvider.interceptors.push(function ($q, $location) {
            return {
                responseError: function (rejection) {
                    console.log("Redirect");
                    if (rejection.status == 401 && $location.path() !== '/login' && $location.path() !== '/register') {
                        $location.nextAfterLogin = $location.path();
                        $location.path('/intro');
                     }
                    return $q.reject(rejection);
                }
            };
        });
    })
;