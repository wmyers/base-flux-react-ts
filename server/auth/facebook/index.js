'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

//defines '/auth/facebook' route

// route for facebook authentication and login
// different scopes while logging in
router.get('/',
  passport.authenticate('facebook'
));

// handle the callback after facebook has authenticated the user
// triggered by 'done()' in the configured passport middleware
// NB this iife pattern taken from:
// http://matthewtyler.io/handling-oauth2-with-node-js-and-angular-js-passport-to-the-rescue/

router.get('/callback', function (req, res, next){
  passport.authenticate('facebook', function(err, user) {
        if(err) {
            return next(err);
        }
        if(!user) {
            return res.redirect('http://localhost:8000');
        }

        //now generate my own jwt
        var token = auth.signToken(user._id, user.role);
        //re-direct to the client with jwt
        res.writeHead(302, {
            'Location': process.env.DOMAIN+'/#/loggedin/' + token
        });
        res.end();
    })(req, res, next);
  }
);

module.exports = router;
