'use strict';

//var redis = require('redis'),
//    RDS_PORT = 6379,        //端口号
//    RDS_HOST = '192.168.31.3',    //服务器IP
//    RDS_OPTS = {},            //设置项
//    redis_client = redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var flash = require('express-flash');
var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;


var fs = require('fs');
var index = require('../routes/index');
var users = require('../routes/users');
var login = require('../routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(logger('dev'));

app.use(cookieParser());
app.use(session({
	resave:false,//添加这行
	saveUninitialized: true,//添加这行
	secret: 'jiamh2005', cookie: { maxAge: 6000000 }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));


passport.use('local', new LocalStrategy(
    function (username, password, done) {
        var user = {
            id: '1',
            username: 'admin',
            password: 'pass'
        }; // 可以配置通过数据库方式读取登陆账号

        if (username !== user.username) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (password !== user.password) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    }
));

passport.serializeUser(function (user, done) {//保存user对象
    done(null, user);//可以通过数据库方式操作
});

passport.deserializeUser(function (user, done) {//删除user对象
    done(null, user);//可以通过数据库方式操作
});


// 认证页面
app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

//提供两个接口，一个GET用于获取参数，一个POST用于提交数据。
app.get('/api/servers', function (req, res) {
	console.log("URL-GET:"+req.originalUrl);

	var jFileData = JSON.parse(fs.readFileSync(__dirname + '/ServicesData.json', 'utf8'));

	res.send(jFileData);
});

app.post('/api/servers', function (req, res) {
	console.log("URL-POST from IP is :"+req.ip);
	console.log("URL-POST body is :"+JSON.stringify(req.body));

	//将数据处理后，先存在文件中。注意：后面可能会保存在Redis中
	//(1)数据处理，增加IP地址
	var jData = req.body;
	for (var i=0;i<jData.servers.services.length;i++)
	{
		jData.servers.services[i].ip=req.ip;
	}

	//写入文件
	var w_str = JSON.stringify(jData);

	fs.writeFile(__dirname + '/ServicesData.json', w_str, {flag: 'w'}, function (err) {
	   if(err) {
		console.error(err);
		} else {
		   console.log('写入成功');
		}
	});

	//res.send(req.body);
	res.send("Succeeded");
});

// 下面use的都是router规范的函数
app.use('/', index);
app.use('/users', users);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


var service = app.listen(9999, '0.0.0.0', function() {
	var host = service.address().address;
	var port = service.address().port;
	console.log('Server started and listening on port', host, port);
});

//redis_client.on('ready',function(err){
//    console.log('Redis is ready for use...');
//});
