var express = require('express'),
    fs = require('fs'),
    http = require('http'),
    marked = require('marked'),
    path = require('path'),
    comb = require('./comb'),
    Comb = require('csscomb');

var app = express();

// All environments:
app.set('port', process.env.PORT || 4444);
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Development only:
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*
// Error page:
app.use(function(req, res, next){
  res.redirect('/');
  res.status(404).render('error', { title: 'Page not found' });
});
 */
app.use(function(req, res, next){
  res.redirect('/');
});

// Settings for documentation parsing:
marked.setOptions({ grm: true });
app.param('doc', function (req, res, next, id) {
    var file = './node_modules/csscomb/doc/' + id;
    if (!id.match(/\.md$/)) file += '.md';
    if (fs.existsSync(file)) req.doc = fs.readFileSync(file, 'utf8');
    next();
});

// Routes:
app.get('/', function(req, res){
  res.render('index', { id: 'index', title: 'Makes your code beautiful' });
});
app.get('/config', function(req, res){
  res.render('config', { id: 'config', title: 'Build config' });
});
app.get('/docs', function(req, res){
  res.render('docs', { id: 'docs', title: 'Getting started' });
});
app.get('/docs/:doc', function(req, res, next){
  if (!req.doc) res.render('docs', { id: 'docs', title: 'Getting started' });
  else res.render('docs', { id: 'docs', content: marked(req.doc) });
});
app.get('/online', function(req, res){
    var csscomb = new Comb();
    var configs = {
        csscomb: JSON.stringify(csscomb.getConfig('csscomb'), null, 4),
        yandex: JSON.stringify(csscomb.getConfig('yandex'), null, 4),
        zen: JSON.stringify(csscomb.getConfig('zen'), null, 4)
    };
  res.render('demo', { id: 'demo', title: 'Try online', configs: configs });
});
app.post('/online', comb);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
