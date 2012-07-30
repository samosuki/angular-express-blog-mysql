
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    _ = require("underscore"),
    api = require('./routes/api');

var mysql = require('mysql');
var database = 'blogposts';
var client = mysql.createClient({
  user: 'root',
  password: 'password',
  host: 'localhost',
  port: '',
  database: 'blogposts'
});

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {
    layout: false
  });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API

// GET ALL

app.get('/api/posts', function (req, res) {

var posts = [];

  client.query('SELECT * FROM posts',
  function (err, results, fields) {
    if (err) {
      throw err;
    }
    console.log(results);
    //var deposts = _.first(results, [1]);
    //res.send(deposts);
    //console.log(fields);
    //var json = JSON.stringify(results);
    //res.json(results);
    res.send(results);
    //client.end();
    }
  );
});

// GET

app.get('/api/posts/:pid', function (req, res) {
  var pid = req.params.pid;
  client.query('SELECT * FROM posts WHERE id = ?', [pid],
  function (err, results, fields) {
    if (err) {
      throw err;
    }
    console.log("--- Specific Post ---");
    console.log(results);
    //var deposts = _.first(results, [1]);
    var result = JSON.stringify(results);
    res.end(result);

    if (results) {
      //res.send(results);
      console.log("Results exists");
    } else {
      res.json(false);
      console.log("Nothing Returned");
    }
    
    }
  );
});

// POST

app.post('/api/post', function (req, res) {

  var ptitle = req.body.title;
  var pposts = req.body.text;
  client.query('INSERT INTO posts SET title = ?, posts = ?', [ptitle, pposts]);
    res.send(req.body);
});

// PUT

app.put('/api/posts/:pid', function(req, res) {
  var ptitle = req.body.title;
  var pposts = req.body.text;
  var pid = req.params.pid;
  client.query('UPDATE posts SET title = ?, posts = ? WHERE id = ?', [ptitle, pposts, pid],
  function (err, results, fields) {
    if (err) {
      throw err;
    }
    res.json(results);
    //req.body = results;
    console.log(results);
    res.send(req.body);
    
    }
  );
});


app.delete('/api/post/:id', api.deletePost);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
