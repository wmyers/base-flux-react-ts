var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var auth = require('../auth.service');
var request = require('request');

exports.setup = function(User, facebookConfig) {

  passport.use('facebook', new FacebookStrategy({
      clientID: facebookConfig.appID,
      clientSecret: facebookConfig.appSecret,
      callbackURL: facebookConfig.callbackUrl
    },

    // facebook will send back the tokens and profile
    function(access_token, refresh_token, profile, done) {

      // console.log('FB access_token', access_token);
      // console.log('FB refresh_token', refresh_token);
      // console.log('FB profile', profile);
      // console.log('FB done', done);

      // asynchronous next step
      // so that any new facebook user data will be stored before being queried
      // by the sign-in callback
      process.nextTick(function() {

        // find the user in the database based on their facebook id
        User.findOne({
          'facebook.id': profile.id
        }, function(err, user) {

          // if there is an error, stop everything and return that
          // ie an error connecting to the database
          if (err){
            return done(err);
          }

          // if the user is found, then save their latest access_token
          //TODO store timestamp with access_token to make valid subsequent FB API calls
          if (user) {
            user.facebook.access_token = access_token;
            user.save(function(err) {
              if (err){
                return done(err);
              }
              return done(null, user);
            });

          } else {

            // if there is no user found with that facebook id, then create them
            // firstly, request me from the api with the returned access_token
            //TODO move this into a facebook service module with promisification
            request.get(
            {
              url: 'https://graph.facebook.com/v2.4/'+ profile.id +'?access_token='+access_token+'&fields=first_name,last_name,email,picture'
            }, function(err, response, body) {

              if(err){
                return done(err);
              }

              var newUser = new User();
              body = JSON.parse(body);

              // set all of the facebook information in our user model
              newUser.facebook.id = profile.id; // set the users facebook id
              newUser.facebook.access_token = access_token; // we will save the token that facebook provides to the user
              newUser.facebook.picture = body.picture.data.is_silhouette === false ? body.picture.data.url : null;

              newUser.firstName = body.first_name;
              newUser.lastName = body.last_name;
              newUser.email = body.email;
              newUser.password = auth.randomValueHex(12); //generate a random password for the user

              //NB not setting User.userType, needs to be handled differently on the client from Local auth

              // save our user to the database
              newUser.save(function(err) {
                if (err){
                  done(err);
                }
                // if successful, return the new user
                return done(null, newUser);
              });
            });
          }
        });
      });
    }));

};
