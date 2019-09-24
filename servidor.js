const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); 
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');
const authRoutes = require('./routes/authRoutes');
require('./models/user');
require('./services/passport');

const app = express();

//Client ID 97191110036-lt6vr457dja7eipc1d3774cnb3391itj.apps.googleusercontent.com
//CkientSecret 9lne-J7xkcI20dKFalKkMRMA

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.moongoURL);
authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);



// node --v
// npm --v
// git version 2.20.1.windows.1
/*
C:\Users\tecnologia\Documents\- Mis Documentos\Code\hypermedia>heroku create
Creating app... done, ⬢ intense-sierra-29448
https://intense-sierra-29448.herokuapp.com/ | https://git.heroku.com/intense-sierra-29448.git

*/

//heroku open = hola mundo