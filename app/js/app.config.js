(function (angular) {
    'use strict';

    angular.module('nwApp').config(['$stateProvider','$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "partials/home.html"
            });

    }]);
})(angular);
