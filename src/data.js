 const fs = require('fs');
 const path = require('path');

 //Account
 const accountData = fs.readFileSync('src/json/accounts.json', {
   encoding: 'utf8'
 });

 const accounts = JSON.parse(accountData);

 //User
 const userData = fs.readFileSync('src/json/users.json', {
   encoding: 'utf8'
 })

 const users = JSON.parse(userData);

 //Function to write JSON
 writeJSON = () => {
   let accountsJSON = JSON.stringify(accounts, null, 4);
   fs.writeFileSync(path.join(__dirname, '/../src/json/accounts.json'), accountsJSON, 'utf8')

 }

 module.exports = {
   accounts: accounts,
   users: users,
   writeJSON: writeJSON
 }
