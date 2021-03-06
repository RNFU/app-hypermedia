const passport = require ('passport');
const mongoose = require ('mongoose');
const GoogleStrategy = require ('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const User = mongoose.model('users')

passport.serializeUser((user, done) => { //serializar y deserializar, convertir un objeto ...
    done (null, user.id);
}); 

passport.deserializeUser((id, done)=> {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true //pasa que no hay seguridad y el callback de google no nos acepta la solicitud al decir el proxy, entonces necesitamos decirle que pase por el proxy de heroku para que google acepte la solicitud
    
},
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id })
        .then((existingUser)=> {
            if (existingUser){
                //we already have a record with the given profile ID
                console.log(existingUser);
                done(null,existingUser);
            } else{
                //we don't have a user record with this ID, mae a new record
                new User({googleId: profile.id})
                    .save()
                    .then(user => done(null, user));
            }
        })


    /*console.log(accessToken);
    console.log('access Token', accessToken);
    console.log('refresh Token', refreshToken);
    console.log('profile:', profile);
    */
})
);