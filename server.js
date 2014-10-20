//
// # SimpleServer
//
var path = require('path')
    , express = require('express')
    , mongoose = require('mongoose');

var app = express();
mongoose.connect('mongodb://' + process.env.IP + '/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var studentSchema = new mongoose.Schema({
  firstName: { type: String, trim: true }
  , lastName: { type: String, trim: true }
  , dob: Date
});
var Student = mongoose.model('Students', studentSchema);

app.configure( function() {
  app.use( express.bodyParser() );
  app.use( express.methodOverride() );
  app.use( app.router );
  app.use( express.static( path.join( __dirname, 'client' ) ) );
  app.use( express.errorHandler( { dumpExceptions: true, showStack: true } ) );
} );

app.get( '/api/student', function( req, res, next ) {
  Student.find(function(err, results) {
    if (err) {
      return next(err);
    } else {
      res.json(results);
    }
  });
} );
app.get('/api/student/:id', function(req, res, next) {
  Student.where({ _id: req.params.id }).findOne(function(err, student) {
    if (err) {
      return next(err);
    } else {
      res.json(student);
    }
  });
});
app.post('/api/student', function(req, res, next) {
  var student = new Student({ firstName: req.body.firstName, lastName: req.body.lastName, dob: req.body.dob });
  student.save(function (err) {
    if (err) {
      return next(err);
    } else {
      res.json(student);
    }
  });
});
app.post('/api/student/:id', function(req, res, next) {
  Student.findOneAndUpdate({ _id: req.params.id }, { firstName: req.body.firstName, lastName: req.body.lastName, dob: req.body.dob }, function(err, student) {
    if (err) {
      return next(err);
    } else {
      res.json(student);
    }
  });
});
app.delete('/api/student/:id', function(req, res, next) {
  Student.where({ _id: req.params.id }).findOneAndRemove(function(err, student) {
    if (err) {
      return next(err);
    } else {
      res.json(student);
    }
  });
});

app.listen( process.env.PORT || 3000 );
