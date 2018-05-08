// ===	========================================================================
// ===	Базовая инициализация проекта
// ===	========================================================================

	// Инициализация express
const 	express = require('express'),
 		app = express();

 	/**
 	 * multer 		- работа с почтой, добавление объектов body и file к объекту request
 	 * constants 	- работа с константами
 	 * constant 	- конфиг. файл с базовыми константами
 	 */
const 	multer = require('multer'),
 		constants = require('constants'),
 		constant = require('./config/constants');

 	/**
 	 * Configs - базовый конфиг
 	 * port - Указание порта, который будет прослушивать приложение
 	 */
const 	Configs = require('./configs'),
		port = process.env.PORT || Configs.get('SERVER_PORT');

	/**
	 * passport 	- работа с аутенфикацией 
	 * flash 		- для создания Flash-сообщений (серверные сообщения)
	 * path 		- работа с путями
	 */
const 	passport = require('passport'),
 		flash = require('connect-flash'),
 		path = require('path');

	/**
	 * morgan 		- логирование
	 * cookieParser - работа с cookie
	 * bodyParser 	- работа с body json
	 * session 		- работа с сессиями
	 * dateFormat 	- форматирование объектов DATE в строку
	 */
const 	morgan = require('morgan'),
	 	cookieParser = require('cookie-parser'),
	 	bodyParser = require('body-parser'),
	 	session = require('express-session'),
	 	dateFormat = require('dateformat');

var now = new Date();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// ===	========================================================================
// ===	Подключение к Mongodb
// ===	========================================================================

	// Подключение конф.ф. Mongodb
const 	mongoose = require('mongoose'),
 		configDB = require('./config/database.js');

	// Соединение с БД
//mongoose.connect(configDB.url);


require('./config/passport')(passport); // pass passport for configuration

//set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
//app.use(bodyParser()); // get information from html forms

// ===	========================================================================
// ===	Работа со статикой/view
// ===	========================================================================
	
	// Предоставление статических файлов в Express
app.use(express.static(path.join(__dirname, '')));
	
	// Настройка пути до представлений
app.set('views', path.join(__dirname, 'app/views'));
	
	// set up ejs for templating
app.set('view engine', 'ejs');

app.use(require('ejs-yield'))

// ===	========================================================================
// ===	Работа с аутенфикацией/сессиями
// ===	========================================================================

//required for passport
//app.use(session({ secret: 'iloveyoudear...' })); // session secret

app.use(session({
    secret: 'I Love India...',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());

	// persistent login sessions
app.use(passport.session());

	// use connect-flash for flash messages stored in session
app.use(flash());

// ===	========================================================================
// ===	Работа с роутингом
// ===	========================================================================
require('./config/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


// ===	========================================================================
// ===	Запуск приложения/прослушивание порта
// ===	========================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).render('404', {title: "Sorry, page not found", session: req.sessionbo});
});

app.use(function (req, res, next) {
    res.status(500).render('404', {title: "Sorry, page not found"});
});

exports = module.exports = app;


