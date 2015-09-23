/**
 * http://stackoverflow.com/questions/14968297/use-underscore-inside-angular-controllers
 *
 */
angular.module('underscore', []).factory('_', function() {
    return window._; // assumes underscore has already been loaded on the page
});
