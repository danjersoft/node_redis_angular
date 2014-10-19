var edit = angular.module('edit', []);

edit.controller('EditCtrl', ['$scope', '$routeParams', '$location', 'Student', 
    function($scope, $routeParams, $location, Student) {
        
        if ($routeParams.studentId) {
            Student.get( { studentId: $routeParams.studentId }, function(student) {
                $scope.student = student;
            } );
        }
        
        $scope.save = function() {
            var student = $scope.student;
            if (student.id) {
                student.$save();
                    // reset form
                    $scope.student = null;
                    // redirect to home
                    $location.path('/');
            } else {
                Student.save( { studentId: student.id, name: student.name, description: student.description }, function() {
                    // reset form
                    $scope.student = null;
                    // redirect to home
                    $location.path('/');
                }.bind(this));
            }
        };
        
        $scope.delete = function(event) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            var result = $scope.student.$delete();
            result.then(function() {
                // reset form
                $scope.student = null;
                // redirect to home
                $location.path('/');
            });
        };
    }
]);