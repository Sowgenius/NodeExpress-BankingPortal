 const fs = require('fs');
 const path = require('path');

 const express = require('express');
 const app = express();

 const {
   accounts,
   users,
   writeJSON
 } = require('./data');

 const accountRoutes = require('./routes/accounts');
 const servicesRoutes = require('./routes/services');

 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'ejs');

 //Set static to Public file
 app.use(express.static(path.join(__dirname, 'public')));

 app.use(express.urlencoded({
   extended: true
 }));

 //Routes
 app.get('/', function (req, res) {
   res.render('index', {
     title: 'Account Summary',
     accounts: accounts
   });
 })

 app.get('/profile', function (req, res) {
   res.render('profile', {
     user: users[0]
   });
 })

 app.use('/account', accountRoutes);
 app.use('/services', servicesRoutes);

 //localhost Port
 app.listen(3000, () => {
   console.log('PS Project Running on port 3000!')
 });
