var list = angular.module('list', []);

list.controller('ListCtrl', ['$scope', 'Student', function($scope, Student) {
    $scope.students = Student.query();
}]);