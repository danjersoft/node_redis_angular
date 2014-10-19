var edit = angular.module('edit', []);

edit.controller('EditCtrl', ['$scope', '$routeParams', '$location', 'Student', 
    function($scope, $routeParams, $location, Student) {
        var clearForm = function() {
            // reset form
            $scope.student = null;
            // redirect to home
            $location.path('/');
        }.bind(this);
        
        if ($routeParams.studentId) {
            Student.get( { studentId: $routeParams.studentId }, function(student) {
                $scope.student = student;
                $scope.student.dob = new Date($scope.student.dob);
            } );
        }
        
        $scope.save = function() {
            var student = $scope.student;
            if (student.id) {
                student.$save(clearForm);
            } else {
                Student.save( { firstName: student.firstName, lastName: student.lastName, dob: student.dob }, clearForm);
            }
        };
        
        $scope.delete = function(event) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            var result = $scope.student.$delete();
            result.then(clearForm);
        };
    }
]);