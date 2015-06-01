//Problem: We need a simple way to look at  a user's badge count and Javascript points
//SOlution: Use Node.JS to connect to Treehouse's API to get profile information.
var fs = require('fs');
var profile = require('./profile.js');

var users = process.argv.slice(2);
users.forEach(profile.get);


