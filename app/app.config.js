(function () {
    'use strict';

    angular.module('nwApp').config(function ($routeProvider) {

        var viewBase = 'views/';

        $routeProvider.when('/home', {
            templateUrl: viewBase + 'home/home.html',
            controller: 'HomeController as homeCtrl'
        }).when('/about', {
            templateUrl: viewBase + 'about/about.html',
            controller: 'AboutController as abtCtrl'
        }).otherwise({
            redirectTo: '/home'
        });

    }).run(function ($location) {
        $location.path('/home');
    });
})();
