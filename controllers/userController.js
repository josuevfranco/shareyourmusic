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
		
        
        if (userToLogin === null) {
            console.log('Not found!');
        } else {
            console.log(userToLogin);
        }
        
        if (userToLogin) {
			let passwordOK = false;
            if(req.body.password == userToLogin.password){
				passwordOK = true;
			}
            if (passwordOK) {
                delete userToLogin.Password;
                req.session.userLogged = userToLogin;
                //console.log(req.session.userLogged);
        
                res.cookie('email', req.body.email, { maxAge: (10000000000000 * 600) * 600 })
				console.log(req.session.userLogged)
                return res.redirect('/');
            }else{
				return res.render('user/login', {
					errors: {
						Email: {
							msg: 'El usuario o contraseña son incorrectos'
						}
					}
				});
			}
        }
        return res.render('user/login', {
            errors: {
                email: {
                    msg: 'Usuario no registrado'
                }
            }
        });

	},
	profile: async (req, res) => {
		
	},
}
