(function (angular) {
    'use strict';
    function MainController() {
        var vm = this;

        vm.message = "Welcome";
    }

    angular.module('nwApp').controller('MainController', MainController);
})(angular);