var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// routes
var index = require('./routes/index');
var tasks = require('./routes/tasks');

var PORT = 3000;

var app = express();

// view Engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// set static folder
app.use(express.static(path.join(__dirname,'client')));

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api',tasks);

app.listen(PORT, function() {
  console.log('Server started on PORT ',PORT);
});
