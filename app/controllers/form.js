/*!
	\todo 	Для ajax для экономии времени используется jQuery. 
			Исправить в будущем на конструкцию из статьи: http://qaru.site/questions/442213/how-to-post-xml-data-in-nodejs-httprequest

*/

const 	builder = require('xmlbuilder'),
		parseString = require('xml2js').parseString;

const	jsdom = require("jsdom"),
	 	{ window } = new jsdom.JSDOM(`...`);

var $ = require("jquery")(window),
	AJAX_URI = 'https://mobilebank.uralprombank.ru:4043/MobileBankWebService.svc/QueryXML';

exports.form = function(req, res) {

		// Определение типа запроса на API-сервер
	var body = req.body,
		typeRequest = body.typeRequest;

		// Универсальная функция для отправки ajax
	function ajax(xml) {
		return $.ajax({
			url: AJAX_URI,
			data: xml,
			type: 'POST',
			contentType: 'text/plain;',
			dataType: 'text'
		});
	};

		// Универсальная функция преобразования строки с XML в JSON вид
	function xmlToJSON(xml) {
		var test = false; 

		parseString(xml, function (err, result) {
			test = result;
		});

		return test;
	};

		/** 
		 * Switch для взаимодействия Back-end сайта и API-сервера
		 * Каждый пункт отвечает за обработку одного типа запроса на API-сервер 
		 * с соответствующим ответом клиенту
		 *
		 * Каждый запрос состоит из: 
		 *	- сохранение нужных данных в переменные
		 * 	- генерация xml в переменную xmlRequest для запроса на API-сервер
		 *	- ajax запрос с вызовом функции, обраб. xml ответ и возвращающий ответ клиенту
		 */
	switch(typeRequest) {
			// Первичная регистрация 
		case 'RegistrationUser-Logon':
			const 	UserNameLogon = body.UserName,
					Password = body.Password,
					c = body.c,
					a = body.a,
					KeyTypeLogon = body.KeyType;

			var xmlRequest = builder.create("CLIENT")
					    .ele('Header', {
					    	'QueryType': 'RegistrationUser',
					    	'QueryAction': 'Logon',
					    	'UserName': UserNameLogon,
					    	'Context': ''
					    }).up()
					    .ele('RegistrationUser', {
					    	'Password': Password,
					    	'KeyType': KeyTypeLogon
					    })
					  .end({ pretty: true });

			ajax(xmlRequest).then(data => {
				let xmlAnswer = authLogonXML(data);

				console.dir(xmlAnswer);

				res.send(xmlAnswer);

			}, error => console.log('Error:', error));

			break;

			// Вторая регистрация
		case 'RegistrationUser-Confirm':
			const 	key = body.key,
					ContextConfirm = body.Context,
					UserNameConfirm = body.UserName,
					KeyValue = body.KeyValue,
					KeyTypeConfirm = body.KeyType;

			var xmlRequest = builder.create("CLIENT")
					    .ele('Header', {
					    	'QueryType': 'RegistrationUser',
					    	'QueryAction': 'ConfirmLogin',
					    	'UserName': UserNameConfirm,
					    	'Context': ContextConfirm
					    }).up()
					    .ele('RegistrationUser', {
					    	'KeyValue': KeyValue,
					    	'KeyType': KeyTypeConfirm
					    }).up()
					  .end({ pretty: true });

			ajax(xmlRequest).then(data => {
				let xmlAnswer = authConfirmXML(data);

				console.dir(xmlAnswer);

				res.send(xmlAnswer);

			}, error => console.log('Error:', error));

			break;

			// Главный экран
		case 'MainScreen':
			var ContextMain = body.Context,
				UserNameMain = body.UserName;

			var xmlRequest = builder.create("CLIENT")
					    .ele('Header', {
					    	'QueryType': 'MainScreen',
					    	'QueryAction': 'LoadMainScreen',
					    	'UserName': UserNameMain,
					    	'Context': ContextMain
					    }).up()
					  .end({ pretty: true });

					  console.log(xmlRequest);

			ajax(xmlRequest).then(data => {
				var xmlAnswerMain = MainScreenXML(data);

				res.send(xmlAnswerMain);

			}, error => console.log('Error:', error));
			break;

			// Боковые меню
		case 'MenuClient':
			var ContextMenu = body.Context,
				UserNameMenu = body.UserName;

			var xmlRequest = builder.create("CLIENT")
					    .ele('Header', {
					    	'QueryType': 'MenuClient',
					    	'QueryAction': 'Load',
					    	'UserName': UserNameMenu,
					    	'Context': ContextMenu
					    }).up()
					  .end({ pretty: true });

					  console.log(xmlRequest);

			ajax(xmlRequest).then(data => {
				var xmlAnswerMenu = MenuScreenXML(data);

				res.send(xmlAnswerMenu);

			}, error => console.log('Error:', error));
			break;

		default:
    		console.log( 'Не зарегистрированный запрос' );
	};

		/**
		 * Функции для обработку входящих xml данных 
		 */
		// Универсальная функция на проверку ответа на факт ошибок ErrorAction/ERROR
	function checkXML(object) {
		var status = "none";

		for(var i in object) {
		   	if( (i === 'ErrorAction') || (i === 'ERROR') ) {
		   		status = false;
		   	}
		}

		if(status !== false) {
			status = true;
		}

		return status;
	};

		// Разбор XML при первичной авторизации
	function authLogonXML(data) {
		var xmlAnswer = xmlToJSON(data),
			upb = xmlAnswer.UPB.RegistrationUser[0],
			RegistrationUser = upb.Logon[0].$;

		var status = checkXML(RegistrationUser);

		var result = {
			status: status,
		};

		if(status) {
			var Context = upb.$.Context;

			result.content = RegistrationUser;
			result.Context = Context;
		} else {
			result.ErrorText = RegistrationUser.ReasonError;
		}

		return result;
	};

		// Разбор XML при второй авторизации
	function authConfirmXML(data) {
		var xmlAnswer = xmlToJSON(data),
			upb = xmlAnswer.UPB.RegistrationUser[0],
			ConfirmLogin = upb.ConfirmLogin[0].$;

		var status = checkXML(ConfirmLogin);

		var result = {
			status: status
		};

		if(status) {
			var Context = upb.$.Context;

			result.content = ConfirmLogin;
			result.Context = Context;
		} else {
			result.ErrorText = ConfirmLogin.ErrorDescription;
		}

		return result;
	};

		// Разбор XML для главной страницы: счета и пр.
	function MainScreenXML(data) {
		var xmlAnswer = xmlToJSON(data);
			upb = xmlAnswer.UPB;

		var status = checkXML(upb);

		var result = {
			status: status,
			all: xmlAnswer
		};

		if(status) {
			var	MainScreen = upb.MainScreen[0],
				Context = MainScreen.$.Context,
				CardAccounts = MainScreen.CardAccounts,
				CurrentAccounts = MainScreen.CurrentAccounts,
				DepositAccounts = MainScreen.DepositAccounts;

			result.Context = Context;
			result.CardAccounts = CardAccounts;
			result.CurrentAccounts = CurrentAccounts;
			result.DepositAccounts = DepositAccounts;
		} else {
			result.ErrorText = upb.ERROR[0].$.ErrorText;
		}

		return result;
	};

		// Разбор XML для боковых меню
	function MenuScreenXML(data) {
		var xmlAnswer = xmlToJSON(data);
			upb = xmlAnswer.UPB;

		var status = checkXML(upb);

		var result = {
			status: status
		};

		if(status) {
			var MenuClient = upb.MenuClient[0],
				Context = MenuClient.$.Context,
				AuthorizationInfo = MenuClient.AuthorizationInfo[0].$,
				Avatar = MenuClient.Avatar[0].$,
				BonusInfo = MenuClient.BonusInfo[0].$,
				CourseInfo = MenuClient.CourseInfo[0].Row,
				PersonalInfo = MenuClient.PersonalInfo[0].$,
				LastOperations = MenuClient.PersonalInfo[0];

			result.Context = Context;
			result.AuthorizationInfo = AuthorizationInfo;
			result.Avatar = Avatar;
			result.BonusInfo = BonusInfo;
			result.CourseInfo = CourseInfo;
			result.PersonalInfo = PersonalInfo;
			result.LastOperations = LastOperations;
		} else {
			result.ErrorText = upb.ERROR[0].$.ErrorText;
		}

		return result;
	};
};