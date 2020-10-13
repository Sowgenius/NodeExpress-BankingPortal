 const fs = require('fs');
 const path = require('path');

 const express = require('express');
 const app = express();

 const {
   accounts,
   users,
   writeJSON
 } = require('./data');

 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'ejs');

 //Set static to Public file
 app.use(express.static(path.join(__dirname, 'public')));

 app.use(express.urlencoded({
   extended: true
 }));
 /*
  const accountData = fs.readFileSync('src/json/accounts.json', {
    encoding: 'utf8'
  });

  const accounts = JSON.parse(accountData);

  const userData = fs.readFileSync('src/json/users.json', {
    encoding: 'utf8'
  })

  const users = JSON.parse(userData);
 */
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

 app.get('/savings', function (req, res) {
   res.render('account', {
     account: accounts.savings
   });
 })

 app.get('/checking', function (req, res) {
   res.render('account', {
     account: accounts.checking
   });
 })

 app.get('/credit', function (req, res) {
   res.render('account', {
     account: accounts.credit
   });
 })

 app.get('/transfer', function (req, res) {
   res.render('transfer');
 })

 app.post('/transfer', function (req, res) {
   accounts[req.body.from].balance -= req.body.amount;
   accounts[req.body.to].balance += parseInt(req.body.amount, 10);
   let accountsJSON = JSON.stringify(accounts, null, 4);

   //fs.writeFileSync(path.join(__dirname, '/../src/json/accounts.json'), accountsJSON, 'utf8')
   writeJSON();

   res.render('transfer', {
     message: "Transfer Completed"
   })

 })

 app.get('/payment', function (req, res) {
   res.render('payment', {
     account: accounts.credit
   })

 })

 app.post('/payment', function (req, res) {
   accounts.credit.balance -= req.body.amount;
   accounts.credit.available += parseInt(req.body.amount, 10);
   let accountsJSON = JSON.stringify(accounts, null, 4);

   //fs.writeFileSync(path.join(__dirname, '/../src/json/accounts.json'), accountsJSON, 'utf8');
   writeJSON();

   res.render('payment', {
     message: "Payment Successful",
     account: accounts.credit
   })

 })

 //localhost Port
 app.listen(3000, () => {
   console.log('PS Project Running on port 3000!')
 });
