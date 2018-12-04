var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var config      = require('./config/database'); // get db config file
var Event        = require('./app/models/Events');
var apiRoutes = express.Router();
var path = require('path');
var port        = process.env.PORT || 9000;
var fs = require('fs');
var pass; //present level of the user
var usern;
var dateofvent;
var prname; 
var i=0;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// connect the api routes under /api/*
app.use('/', apiRoutes);
 
// log to console
app.use(express.static("public"));
app.use('/css', express.static('public'))
app.use('/css/fonts', express.static('public'))
// Use the passport package in our application
mongoose.connect(config.database);

 
// pass passport for configuration
app.set('view engine', 'ejs');
 
// viewed at http://localhost:8080
app.get('/', function(req, res){
    Event.find({}).sort({dovenue:1}).exec(function(err, obj) { 
  		for(;i>=0;i++)
  		{   
  			if(obj[i].dovenue>Date.now())
  			{	console.log(obj[i].dovenue);
  				break;
  			}
  		}
   		res.render('home',{Date:obj[i].dovenue.getDate()+'/' + (obj[i].dovenue.getMonth()+1) + '/'+obj[i].dovenue.getFullYear(),Venue:obj[i].Venue});
	});
});
app.get('/project', function(req, res){
  var filePath = "./views/Project.html"
 		var resolvedPath = path.resolve(filePath);
 		console.log(resolvedPath);
 		return res.sendFile(resolvedPath);
});
app.get('/sohini-sangeet-academy', function(req, res){
  var filePath = "./views/Sohini-sangeet-academy.html"
 		var resolvedPath = path.resolve(filePath);
 		console.log(resolvedPath);
 		return res.sendFile(resolvedPath);
});
app.get('/gharana', function(req, res){
  var filePath = "./views/Gharana.html"
 		var resolvedPath = path.resolve(filePath);
 		console.log(resolvedPath);
 		return res.sendFile(resolvedPath);
});
app.get('/bio', function(req, res){
  var filePath = "./views/Bio.html"
 		var resolvedPath = path.resolve(filePath);
 		console.log(resolvedPath);
 		return res.sendFile(resolvedPath);
});
app.get('/upcoming_events', function(req, res){
  var filePath = "./views/upcoming_events.html"
    var resolvedPath = path.resolve(filePath);
    console.log(resolvedPath);
    return res.sendFile(resolvedPath);
});

app.get('/contact', function(req, res){
  var filePath = "./views/Contact.html"
 		var resolvedPath = path.resolve(filePath);
 		console.log(resolvedPath);
 		return res.sendFile(resolvedPath);
});
app.get('/band', function(req, res){
  var filePath = "./views/Band.html"
 		var resolvedPath = path.resolve(filePath);
 		console.log(resolvedPath);
 		return res.sendFile(resolvedPath);
});
app.get('/video', function(req, res){
  var filePath = "./views/Video.html"
 		var resolvedPath = path.resolve(filePath);
 		console.log(resolvedPath);
 		return res.sendFile(resolvedPath);
});
app.get('/discography', function(req, res){
  var filePath = "./views/Discography.html"
 		var resolvedPath = path.resolve(filePath);
 		console.log(resolvedPath);
 		return res.sendFile(resolvedPath);
});

app.get('/shows', function(req, res){
  var filePath = "./views/Shows.html"
    var resolvedPath = path.resolve(filePath);
    console.log(resolvedPath);
    return res.sendFile(resolvedPath);
});

app.get('/past_events', function(req, res){
  var filePath = "./views/past_events.html"
    var resolvedPath = path.resolve(filePath);
    console.log(resolvedPath);
    return res.sendFile(resolvedPath);
});

app.get('/playing-with-stalwarts', function(req, res){
  var filePath = "./views/Playing-with-stalwarts.html"
 		var resolvedPath = path.resolve(filePath);
 		console.log(resolvedPath);
 		return res.sendFile(resolvedPath);
});
app.get('/photos', function(req, res){
  var filePath = "./views/Photos.html"
 		var resolvedPath = path.resolve(filePath);
 		console.log(resolvedPath);
 		return res.sendFile(resolvedPath);
});
app.get('/news', function(req, res){
  var filePath = "./views/News.html"
    var resolvedPath = path.resolve(filePath);
    console.log(resolvedPath);
    return res.sendFile(resolvedPath);
});

app.get('/tours', function(req, res){
  var filePath = "./views/Tours.html"
    var resolvedPath = path.resolve(filePath);
    console.log(resolvedPath);
    return res.sendFile(resolvedPath);
});

app.get('/eventsinput', function(req, res){
  res.render('events' , { message:'Enter Event Details' });
});



app.get('/login', function(req, res) {
  res.render('index',{ message: '' });
});
app.get('/update1', function(req, res) {
  res.render('update1',{ message: '' });
});

app.post('/authenticate', function(req, res) {
  if(req.body.password == 'Admin' && req.body.user == 'Admin')
  { res.redirect('/eventsinput');
    
  }
  else
  {
    res.render('index' , { message:'Invalid username' });
  }
  });

app.post('/eventsenter', function(req, res){
  new Event({
    _id    : req.body.name,
    dovenue:req.body.day,
    Venue: req.body.venue
  }).save(function(err, doc){
    if(err) res.render('events',{message:'not entered'});
    else    res.render('events',{message:'entered'});
  });
});

app.get('/selectall', function(req, res){
  Event.find({}).sort({dovenue:1}).exec(function(err, obj) { 
  		console.log(obj);
  		 res.render('select',{ docs : obj});
        });
});


app.get('/selectall', function(req, res){
  Event.find({}).sort({dovenue:1}).exec(function(err, obj) { 
  		console.log(obj);
  		 res.render('select',{ docs : obj});
        });
});

app.get('/display', function(req, res){
  var filePath = "./views/select.html"
 		var resolvedPath = path.resolve(filePath);
 		console.log(resolvedPath);
 		return res.sendFile(resolvedPath);
});

app.post('/updatedate', function(req, res){
  Event.findByIdAndUpdate({_id: req.body.name1},
                     {
            Venue: req.body.day1
         }, function(err, docs){
        if(err) { res.render('update1',{message:'NOt updated'}); }  
        else
        { 
           res.render('events',{ message: 'updated'});
         }
       });
});

app.listen(port);
console.log('Infinity war has started: http://localhost:' + port);