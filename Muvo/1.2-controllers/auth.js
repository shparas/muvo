const User = require('../2.1-models/user');

exports.signup = (req, res, next) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const zip = req.body.zip;
  const phone = req.body.phone;
  const email = req.body.email;
	const pass = req.body.pass;
	
  const authorizationLevel = 1;
  
	const user = new User({
		fname: fname,
		lname: lname,
		zip: zip,
		email: email,
		phone: phone,
		pass: pass,
		authorizationLevel: authorizationLevel
	});
	return user.save().then(result => {
		req.session.fname = fname;
		req.session.lname = lname;
		req.session.zip = zip;
		req.session.phone = phone;
		req.session.email = email;
		req.session.isAuthorized = true;
		
		res.redirect('/');
	})
};

exports.signin = (req, res, next) => {
  const email = req.body.email;
  const pass = req.body.pass;
  User.findOne({ email: email, pass: pass })
    .then(user => {
      if (!user) {
        res.redirect('/');
      }
      req.session.fname = user.fname;
			req.session.lname = user.lname;
			req.session.zip = user.zip;
			req.session.phone = user.phone;
			req.session.email = user.email;
			req.session.isAuthorized = true;
			
			console.log("here");
			res.redirect('/');
		})
		.catch(err => res.redirect('/'));		
};
exports.signout = (req, res, next) => {
	req.session.destroy( err => {});
	res.redirect('/');
};
