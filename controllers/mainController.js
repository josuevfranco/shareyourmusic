const db = require('../database/models');
const fetch = require('cross-fetch');

module.exports = {
	index: (req, res) => {
		let Posts = [];
		let User2 = [];
		let profile = [];

		db.Post.findAll()
            .then(function(Post) {
               Posts = Post
        })

		db.Post.findAll({
			include: [{
			  model: db.User
			}]
		  }).then(posts => {
			profile = posts
		});

	
		db.User.findAll()
            .then(function(User) {
                return res.render('index', { 'Posts': Posts, 'User' : User, 'profile' : profile });
        })
	},
	createPost: async (req, res) =>  {

		const d = new Date();
		let id = d.getTime();

		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();

		today = mm + '/' + dd + '/' + yyyy;

		let payload = await fetch('https://api.ipregistry.co/?key=fxszopqcaz22b19p').then(response => response.json())
		let location = payload.location.country.name + ', ' + payload.location.city;
		console.log(location)
			
		let category = ['Music News', 'Music Quotes', 'Heartbreak Songs', 'Taylor Swift'];
		let selected = req.body.opciones;
		
		let pos = 0;

        for(let i=0; i<category.length; i++){
            if(category[i] == selected){
                pos = i+1;
            }
        }

		let likes = 0;

		try{
			await db.Post.create({
				Date: today,
				Text: req.body.Text,
				Location: location,
				Id_Category: pos,
				Likes: likes,
				Username: res.locals.userLogged.Username,
				id_User: res.locals.userLogged.Id_User
			});
		}catch(err){
			return res.send(err)
		}
		
		return res.redirect('/');

	},
	heartBreakSongs: async (req, res) => {
		
		try{
			await db.Post.findAll({
				where: {
					Id_Category: '3'
				}
				}).then(Posts=>{
					return res.render('musicNews', { 'Posts': Posts, 'titulo': "Heart Break Posts" });
				});
		}catch(err){
			return res.send(err)
		}

	},
	musicQuotes: async (req, res) => {

		try{
			await db.Post.findAll({
				where: {
					Id_Category: '2'
				}
				}).then(Posts=>{
					return res.render('musicNews', { 'Posts': Posts, 'titulo': "Music Quotes Posts" });
				});
		}catch(err){
			return res.send(err)
		}


	},
	taylorSwift: async (req, res) => {

		try{
			await db.Post.findAll({
				where: {
					Id_Category: '4'
				}
				}).then(Posts=>{
					return res.render('musicNews', { 'Posts': Posts, 'titulo': "Taylor Swift Posts" });
				});
		}catch(err){
			return res.send(err)
		}

	},
	musicNews: async (req, res) => {
			try{
				await db.Post.findAll({
					where: {
						Id_Category: '1'
					}
					}).then(Posts=>{
						return res.render('musicNews', { 'Posts': Posts, 'titulo': "Music News Posts" });
					});
			}catch(err){
				return res.send(err)
			}
	},
	category: async (req, res) => {
		try{
			await db.Post.findAll({
				group: ['Location']
				}).then(Posts=>{
					return res.render('musicNews', { 'Posts': Posts, 'titulo': "Featured Posts Grouped By Location" });
				});
		}catch(err){
			return res.send(err)
		}		
	},
	ourUser: (req, res) => {
		let Posts = [];
		let User2 = [];
		let profile = [];

		db.Post.findAll()
            .then(function(Post) {
               Posts = Post
        })

		db.Post.findAll({
			include: [{
			  model: db.User
			}]
		  }).then(posts => {
			profile = posts
		});

	
		db.User.findAll()
            .then(function(User) {
                return res.render('ourUser', { 'Posts': Posts, 'User' : User, 'profile' : profile });
        })		
	},
}