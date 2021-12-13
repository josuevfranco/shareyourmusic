const express = require('express');
const app = express();
const session = require('express-session');

app.use(express.urlencoded({ extended: false }));

app.use(express.static('./public'));
app.listen(3000, () => console.log('Server running at port 3000'));

// Template Engine
app.set('view engine', 'ejs');

// Routers
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const services = require('./routes/servicesRoutes');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.use(session({
    secret: "It´s a secret",
    resave: false,
    saveUninitialized: false,
}));

app.use(userLoggedMiddleware);
app.use('/', mainRoutes);
app.use('/user', userRoutes);
app.use('/youtubeTop', services);