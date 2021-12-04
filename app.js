const express = require('express');
const app = express();
const session = require('express-session');

app.use(express.urlencoded({ extended: false }));

app.use(express.static('./public'));
app.listen(3000, () => console.log('Servidor levantado en el puerto 3000'));

// Template Engine
app.set('view engine', 'ejs');

// Routers
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const services = require('./routes/servicesRoutes');

app.use(session({
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
}));


app.use('/', mainRoutes);
app.use('/user', userRoutes);
app.use('/youtubeTop', services)
