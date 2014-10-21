var StudentService = require('./student-service');

module.exports = function(app) {
    app.get('/api/student', function(req, res, next) {
        StudentService.getAllStudents(function(err, students) {
            if (err) {
                return next(err);
            }
            else {
                res.json(students);
            }
        });
    });
    app.get('/api/student/:id', function(req, res, next) {
        StudentService.getStudentById(req.params.id, function(err, student) {
            if (err) {
                return next(err);
            }
            else {
                res.json(student);
            }
        });
    });
    app.post('/api/student', function(req, res, next) {
        StudentService.addStudent(req.body.firstName, req.body.lastName, req.body.dob, function(err, student) {
            if (err) {
                return next(err);
            }
            else {
                res.json(student);
            }
        });
    });
    app.post('/api/student/:id', function(req, res, next) {
        StudentService.updateStudent(req.params.id, req.body.firstName, req.body.lastName, req.body.dob, function(err, student) {
            if (err) {
                return next(err);
            }
            else {
                res.json(student);
            }
        });
    });
    app.delete('/api/student/:id', function(req, res, next) {
        StudentService.deleteStudent(req.params.id, function(err, student) {
            if (err) {
                return next(err);
            }
            else {
                res.json(student);
            }
        });
    });
};