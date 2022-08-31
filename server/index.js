const express = require('express');
let app = express();
let bodyParser = require('body-parser');
let gh = require('../helpers/github.js')


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // console.log(`request made to post. Req: ${req}`);
  console.log(`request made to post. Req term: ${req.body.term}`);
  let repos = gh.getReposByUsername(req.body.term)
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  res.send(`Callback made for term ${req.body.term}`);
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

