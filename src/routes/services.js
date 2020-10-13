 const express = require('express');
 const router = express.Router();
 const {
   accounts,
   writeJSON
 } = require('../data');


 router.post('/transfer', function (req, res) {
   accounts[req.body.from].balance -= req.body.amount;
   accounts[req.body.to].balance += parseInt(req.body.amount, 10);
   let accountsJSON = JSON.stringify(accounts, null, 4);

   writeJSON();

   res.render('transfer', {
     message: "Transfer Completed"
   })

 })

 router.post('/payment', function (req, res) {
   accounts.credit.balance -= req.body.amount;
   accounts.credit.available += parseInt(req.body.amount, 10);
   let accountsJSON = JSON.stringify(accounts, null, 4);

   writeJSON();

   res.render('payment', {
     message: "Payment Successful",
     account: accounts.credit
   })

 })

 router.get('/transfer', function (req, res) {
   res.render('transfer');
 })

 router.get('/payment', function (req, res) {
   res.render('payment', {
     account: accounts.credit
   })
 })

 module.exports = router;
