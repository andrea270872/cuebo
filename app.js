
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var favicon = require('serve-favicon');
var morgan = require('morgan');

var app = express();

/* fixed for Express 4.x according to 
   https://github.com/strongloop/express/wiki/Migrating-from-3.x-to-4.x
 */
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('dev')); // logger!

app.use(express.static(path.join(__dirname, 'public')));
  
app.get('/', routes.index);

// This is to set up the route for chat
app.get('/chat', function(req, res){
  res.render('chat.jade', { title: 'Cuebo Chat' });
});

// New code for opshift deployment
var port =  process.env.OPENSHIFT_NODEJS_PORT || 8080;   // Port 8080 if you run locally
var address =  process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1"; // Listening to localhost if you run locally
app.listen(port, address);

var server = http.createServer(app).listen(app.get('port'), app.get('address'), function(){
  console.log( "Listening on " + server_ip_address + ", server_port " + port )
});

require('./routes/sockets.js').initialize(server);

