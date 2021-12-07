const { validationResult } = require('express-validator');
const db = require('../database/models');
const fetch = require('cross-fetch');

module.exports = {

	register: (req, res) => {
		return res.render('userRegisterForm');
	},
	processRegister: async (req, res) => {

		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render('userRegisterForm', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		} else {

			let imagenAlternativa = "";
			if (req.file) {
				imagenAlternativa = req.file.filename;
			} else {
				imagenAlternativa = "default.png"
			}

			try{
				await db.User.create({
					Name: req.body.Name,
					Surnames: req.body.Surnames,
					SRC_Image: imagenAlternativa,
					Email: req.body.Email,
					Born_Date: req.body.Date,
					Username: req.body.Username,
					Password: req.body.Password,
					Gender: req.body.Gender
				});
			} catch(error){
				return res.send(error)
			}

			

			return res.send('Ok, las validaciones se pasaron y no tienes errores');
		}
	},
	login: (req, res) => {
		return res.render('userLoginForm');
	},
	processLogin: async (req, res) => {

		let userToLogin = null;

		try{
			userToLogin = await db.User.findOne({ where: { Email: req.body.Email } });
		} catch(error){
			return res.send(error)
		}
		        
        if (userToLogin) {

			let passwordOK = false;
            if(req.body.Password === userToLogin.Password){
				passwordOK = true;
			}

            if (passwordOK) {
				delete userToLogin.Password
				req.session.userLogged = userToLogin
				
                
				return res.render('index');

            }else{
				return res.render('userLoginForm', {
					errors: {
						Email: {
							msg: 'Invalid Credentials'
						}
					}
				});
			}
        }

        return res.render('userLoginForm', {
            errors: {
                Email: {
                    msg: 'Email not registred'
                }
            }
        });

	},
	profile: (req, res) => {
		return res.render('profile',{
			User : req.session.userLogged 
		});
	},
	logout: (req, res) => {
		req.session.destroy();
		return res.redirect('/');
	}
}
