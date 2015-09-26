/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');

User.find({}).remove(function() {
  console.log('removed users');
  createTestUsers();
});

function createTestUsers (){
  //test employee
  User.create({
    provider: 'local',
    firstName: 'Dave',
    lastName: 'Tickell',
    email: 'dave@test.com',
    password: 'test',
    role: 'admin'
  }, function(err, user) {
      console.log('created test user');
    }
  );
}
