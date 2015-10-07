(function (angular) {
    'use strict';

    angular.module('nwApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/error');

        $stateProvider
            .state('about', {
                url: '/about',
                templateUrl: 'views/about/about.html',
                controller: 'AboutController'
            });
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/home/home.html',
                controller: 'HomeController'
            });


    }]).run(['$state', function ($state) {
        $state.go('home');
    }]);
})(angular);
