const express = require('express');
const router = express.Router();

const path = require('path');
const multer = require('multer');


const { body } = require('express-validator');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/images/avatars');
	},
	filename: (req, file, cb) => {
		let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
		cb(null, fileName);
	}
})

const uploadFile = multer({ storage });
const usersController = require('../controllers/userController');

const validations = [
	body('Name').notEmpty().withMessage('Please, type your name.').bail()
		.isLength({ min: 2 }).withMessage('Your name must be at least two characters long.'),
	body('Surnames').notEmpty().withMessage('Please, type your surnames.').bail()
		.isLength({ min: 2 }).withMessage('Your surnames must be at least two characters long.'),
	body('Email').notEmpty().withMessage('Please, type your email.').bail()
		.isEmail().withMessage('Enter a valid email.'),
	body('Password').notEmpty().withMessage('Please, type a password. ').bail()
		.isLength({ min: 8 }).withMessage('Your password must be at least eight characters long.'),
	body('Date').notEmpty().withMessage('Please, select a date'),
	body('Username').notEmpty().withMessage('Please, type your username.').bail()
		.isLength({ min: 5 }).withMessage('Your username must be at least five characters long.'),
	body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];

		if (!file) {
			//throw new Error('Tienes que subir una imagen');
			//No pasa nada si no sube imagen, se le asigna una imagen en automático.
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]


// Formulario de registro
router.get('/register', usersController.register);

// Procesar el registro
router.post('/register', uploadFile.single('avatar'), validations, usersController.processRegister);

// Formulario de login
router.get('/login', usersController.login);

// Procesar el login
router.post('/login', usersController.processLogin);


// Perfil de Usuario
router.get('/profile/:userId', usersController.profile);

module.exports = router;