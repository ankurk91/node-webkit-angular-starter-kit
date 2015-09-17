(function (angular) {
    'use strict';

    angular.module('nwApp').config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "partials/application.html"
            });

    })
})(angular);
