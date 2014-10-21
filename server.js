var path = require('path')
    , express = require('express');

var app = express();
// create routes
require('./server/routes')(app);

app.configure( function() {
  app.use( express.bodyParser() );
  app.use( express.methodOverride() );
  app.use( app.router );
  app.use( express.static( path.join( __dirname, 'client' ) ) );
  app.use( express.errorHandler( { dumpExceptions: true, showStack: true } ) );
} );

app.listen( process.env.PORT || 3000 );
