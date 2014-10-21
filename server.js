var path = require('path')
    , express = require('express')
    , StudentService = require('./server/student-service');

var app = express();

app.configure( function() {
  app.use( express.bodyParser() );
  app.use( express.methodOverride() );
  app.use( app.router );
  app.use( express.static( path.join( __dirname, 'client' ) ) );
  app.use( express.errorHandler( { dumpExceptions: true, showStack: true } ) );
} );

app.get( '/api/student', function( req, res, next ) {
  StudentService.getAllStudents(function(err, students) {
    if (err) {
      return next(err);
    } else {
      res.json(students);
    }
  });
} );
app.get('/api/student/:id', function(req, res, next) {
  StudentService.getStudentById(req.params.id, function(err, student) {
    if (err) {
      return next(err);
    } else {
      res.json(student);
    }
  });
});
app.post('/api/student', function(req, res, next) {
  StudentService.addStudent(req.body.firstName, req.body.lastName, req.body.dob, function (err, student) {
    if (err) {
      return next(err);
    } else {
      res.json(student);
    }
  });
});
app.post('/api/student/:id', function(req, res, next) {
  StudentService.updateStudent(req.params.id, req.body.firstName, req.body.lastName, req.body.dob, function(err, student) {
    if (err) {
      return next(err);
    } else {
      res.json(student);
    }
  });
});
app.delete('/api/student/:id', function(req, res, next) {
  StudentService.deleteStudent(req.params.id, function(err, student) {
    if (err) {
      return next(err);
    } else {
      res.json(student);
    }
  });
});

app.listen( process.env.PORT || 3000 );
