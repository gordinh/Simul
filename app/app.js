// Load environment variables when NODE_ENV is local
process.env.GOOGLE_CLIENT_ID = '128954003662-jfdr1qs8c1gledo2lbgae5v191romjuj.apps.googleusercontent.com';

var restify = require('restify');
var logger = require('morgan');
var requireDir = require('require-dir');

var middlewares = requireDir('middlewares');
var controllers = requireDir('controllers');
var app = restify.createServer();

app.pre(restify.pre.sanitizePath());
app.on('uncaughtException', middlewares.raven.uncaught());
app.on('MethodNotAllowed', middlewares.cors.MethodNotAllowed());
app.use(logger('dev')); // Logs http requests on terminal
app.use(middlewares.cors.request());
app.use(restify.authorizationParser());
app.use(restify.bodyParser({keepExtensions: true})); // Inject x-www-form-urlencoded request variables to req.params
app.use(restify.queryParser()); // Allows use of req.query
app.use(middlewares.requestValidator.inject()); // Inject valitator

middlewares.oauth2(app);

app.use(middlewares.paramInjector.inject());

app.use(middlewares.auth);
require('./routes')(app, controllers, middlewares);
cron.start();

module.exports = app;
