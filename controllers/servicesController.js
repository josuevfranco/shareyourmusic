const fetch = require('cross-fetch');
const { search } = require('../routes/servicesRoutes');

module.exports = {
    top: async (req, res) => {

      let videos = await fetch('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=RDCLAK5uy_miaOXTdKX3AxhX2xjqjyBxtIS8H89hX1g&key=AIzaSyDMzWpfdUnIsbY7uI67mN_BY4KgfdGPHFU').then(response => response.json())
      
      return res.render('topvideos', {videos})      
    },
    search: async (req, res) => {

      let YOUTUBE_API_KEY = 'AIzaSyDMzWpfdUnIsbY7uI67mN_BY4KgfdGPHFU';
      let q = req.query.q
      console.log(q);
      let videos = await fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyDMzWpfdUnIsbY7uI67mN_BY4KgfdGPHFU&type=video&part=snippet&q='+q).then(response => response.json())
      
      return res.render('search', {videos})      
    } 
}