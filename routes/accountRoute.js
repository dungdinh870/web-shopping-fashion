var User = require('../model/account');

module.exports = function(app, passport){
	app.get('/api', function(req, res){
		res.render('index.ejs');
	});

	app.get('/api/login', function(req, res){
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});
	app.post('/api/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.get('/api/signup', function(req, res){
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});


	app.post('/api/signup', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	app.get('/api/profile', isLoggedIn, function(req, res){
		res.render('profile.ejs', { user: req.user });
	});
	// app.get('/users', isLoggedIn, function(req, res){
	// 	res.json({ user: req.user });
	// });
	app.get('/api/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

	app.get('/api/auth/facebook/callback', 
	  passport.authenticate('facebook', { successRedirect: '/api/profile',
	                                      failureRedirect: '/' }));

	app.get('/api/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

	app.get('/api/auth/google/callback', 
	  passport.authenticate('google', { successRedirect: '/api/profile',
	                                      failureRedirect: '/' }));


	app.get('/api/logout', function(req, res){
		req.logout();
		res.redirect('/api');
	})
};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		console.log(req.isAuthenticated())
		return next();
	}
	res.redirect('/api/login');
}
