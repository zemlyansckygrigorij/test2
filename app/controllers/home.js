var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');

exports.loggedIn = function(req, res, next) {

	if (req.session.user) { // req.session.passport._id
		next();

	} else {
		res.redirect('/');

	}
}

exports.home = function(req, res) {
	
	res.layout('home.ejs', {
		error : req.flash("error"),
		success: req.flash("success"),
		session:req.session,
	});
}

    
