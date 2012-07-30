/*
 * Serve JSON to our AngularJS client
 */
/*

*/
// GET ALL POSTS
/*
exports.posts = function (req, res) {

  client.query('SELECT * FROM posts',
  function (err, results, fields) {
    if (err) {
      throw err;
    }
    console.log(results);
    //console.log(fields);
    //var json = JSON.stringify(results);
    res.json(results);
    client.end();
    }
  );
};
*/
// GET SPECIFIC POST
/*
exports.post = function (req, res) {
  var pid = req.params.pid;
  client.query('SELECT * FROM posts WHERE id = ?', [pid],
  function (err, results, fields) {
    if (err) {
      throw err;
    }
    console.log("--- Specific Post ---");
    
    res.send(results);

    //console.log(fields);
    //var json = JSON.stringify(results);
    //res.send(json);
    //res.send(results);
    //res.json(results);
    console.log(results);
    //res.send('post id: ' + pid);
    //client.end();
    }
  );
};
*/
// POST

exports.addPost = function(req, res) {
	data.posts.push(req.body);
	res.json(req.body);
};

// PUT
exports.editPost = function (req, res) {
  var id = req.params.id;
  
  if (id >= 0 && id < data.posts.length) {
    data.posts[id] = req.body;
    res.json(true);
  } else {
    res.json(false);
  }
};
 
// DELETE
exports.deletePost = function (req, res) {
  var id = req.params.id;
  
  if (id >= 0 && id < data.posts.length) {
    data.posts.splice(id, 1);
    res.json(true);
  } else {
    res.json(false);
  }
};
