const fetch = require('cross-fetch');

module.exports = {
    top: async (req, res) => {

		let videos = await fetch('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=RDCLAK5uy_miaOXTdKX3AxhX2xjqjyBxtIS8H89hX1g&key=AIzaSyDMzWpfdUnIsbY7uI67mN_BY4KgfdGPHFU').then(response => response.json())
		
		return res.render('topvideos', {videos})      
    }
}