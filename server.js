//
// # SimpleServer
//
var path = require('path')
    , express = require('express')
    , client = require( 'redis' ).createClient( 16379, process.env.IP );

var app = express();

var students = [
  { id: 1, name: 'Student One', description: 'Description One' }
  , { id: 2, name: 'Student Two', description: 'Description Two' }
];

app.configure( function() {
  app.use( express.bodyParser() );
  app.use( express.methodOverride() );
  app.use( app.router );
  app.use( express.static( path.join( __dirname, 'client' ) ) );
  app.use( express.errorHandler( { dumpExceptions: true, showStack: true } ) );
} );

app.get( '/api/student', function( req, res ) {
  res.json(students);
} );
app.get('/api/student/:id', function(req, res) {
  students.forEach(function(student) {
    if ( req.params.id == student.id) {
      res.json(student);
    }
  });
});
app.post('/api/student', function(req, res) {
  students.push({ name: req.body.name, description: req.body.description, id: students.length});
  res.json(students[students.length - 1]);
});
app.post('/api/student/:id', function(req, res) {
  students.forEach(function(student) {
    if ( req.params.id == student.id) {
      student.name = req.body.name;
      student.description = req.body.description;
      res.json(student);
    }
  });
});
app.delete('/api/student/:id', function(req, res) {
  var studentToDelete = -1;
  students.forEach(function(student, index) {
    if ( req.params.id == student.id) {
      studentToDelete = index;
      res.json(student);
    }
  });
  if (studentToDelete >= 0) {
    students.splice(studentToDelete, 1);
  }
});

app.listen( process.env.PORT || 3000 );
