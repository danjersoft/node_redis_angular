angular.module('SMSApp', ['ngRoute', 'ngResource', 'list', 'edit'])

.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'ListCtrl'
            , templateUrl: 'app/List/list.html'
        })
        .when('/new', {
            controller: 'EditCtrl'
            , templateUrl: 'app/Edit/edit.html'
        })
        .when('/edit/:studentId', {
            controller: 'EditCtrl'
            , templateUrl: 'app/Edit/edit.html'
        })
        .otherwise({
            redirectTo: '/'
        });
    })
    
.factory('Student', ['$resource', function($resource) {
    return $resource('api/student/:studentId', { studentId: '@_id' });
}]);