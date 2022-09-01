const express = require('express');
let app = express();
let bodyParser = require('body-parser');
let gh = require('../helpers/github.js')
let db = require('../database/');


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  const promise = Promise.resolve(gh.getReposByUsername(req.body.term))
    .then(data => {
      // console.log(`Data in server. First repo: ${data[0].full_name}`)
      // save repos
      db.save(data)
    })
    .then(result => {
      console.log(`reached result: ${result}`)
      res.send(`Result of save: ${result}`);
    })
});

app.get('/repos', function (req, res) {
  /* Write a GET /repos endpoint that retrieves the top 25 repos stored in your database, sorted by the criteria you decided on earlier.
  */
  const promise = Promise.resolve(db.retrieveTop25())
    .then(data => {
      if(!data) {throw(data)}
      console.log(`back in Express, data returned of length: ${data.length} `)
      res.send(data)
    })
    .catch(err => {
      console.log(`error: ${err}`)
    })


});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

