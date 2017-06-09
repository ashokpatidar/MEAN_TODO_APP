var express = require('express');
var router = express.Router();
var mongojs = require("mongojs");

//var mongodb = require('mongodb');

//db.createUser({user: "user", pwd: "password", roles:[{ role: "read", db: "config" }]})

//var db = mongojs('mongodb://user:password@localhost:27017/testing',['tasks']);
var db = mongojs("mongodb://user:password@localhost:27017/firsttestdb",['tasks']);

db.on('error', function(err) {
  console.log('unable to connect with database');
});

db.tasks.find(function (err, docs) {
    // docs is an array of all the documents in mycollection
    console.log(err, docs);
    if(err){
      console.log('>>> unable to connect database');
    } else {
      console.log('CONNECTION DONE WITH DATA BASE');
    }
});

// Get all tasks
router.get('/tasks', function(request, response, next) {
  //res.send('TASKS PAGE View');
  db.tasks.find(function(error, tasks) {
    if (error) {
      response.send(error);
    }
    response.json(tasks);
  });
});

// Get Single task

router.get('/task/:id', function(request, response, next) {
  db.tasks.findOne({
    _id: mongojs.ObjectId(request.params.id)
  }, function(error, task) {
    if (error) {
      response.send(error);
    }
    response.json(task)
  });
});

// Save task
router.post('/task', function(request, response, next) {
  var task = request.body;
  if (!task.title || !(task.isDone + '')) {
    response.status(400);
    response.json({
      "error": "Bed Data set"
    });
  } else {
    console.log("-----", task);
    db.tasks.save(task, function(err, task) {
      if (err) {
        response.send(err);
      }
      response.json(task);
    });
  }
});

router.delete('/task/:id', function(request, response, next) {
  db.tasks.remove({
    _id: mongojs.ObjectId(request.params.id)
  }, function(err, task) {
    if (err) {
      response.send(err);
    }
    response.json(task);
  });
});

// update
router.put('/task/:id', function(request, response, next) {
  var task = request.body;
  var modifyTask = {};
  if (task.isDone) {
    modifyTask.isDone = task.isDone;
  }

  if (task.title) {
    modifyTask.title = task.title;
  }

  if (!modifyTask) {
    response.status(400);
    response.json({
      "error": "Bed Data"
    });
  } else {
    db.tasks.update({
      _id: mongojs.ObjectId(request.params.id)
    }, modifyTask, {}, function(error, task) {
      if (error) {
        response.send(error);
      }
      response.json(task);
    });
  }
});

module.exports = router;
