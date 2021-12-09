const db = require('../database/models');
const fetch = require('cross-fetch');

module.exports = {
	index: (req, res) => {
		return res.render('index');
	},
	createPost: (req, res) => {

		const d = new Date();
		let id = d.getTime();

		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();

		today = mm + '/' + dd + '/' + yyyy;
		
		/*
		db.Post.create({
			Date: today,
			Id_Post: id,
			Text: req.body.Text,
			Location: 
			Id_Category:
			Likes:
			Username:
			Id_User:
		})*/

	}
}