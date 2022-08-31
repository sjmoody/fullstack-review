const express = require('express');
let app = express();
let bodyParser = require('body-parser');
let gh = require('../helpers/github.js')
let db = require('../database/');


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // console.log(`request made to post. Req: ${req}`);
  console.log(`request made to post. Req term: ${req.body.term}`);
  const promise = Promise.resolve(gh.getReposByUsername(req.body.term))
    .then(data => {
      console.log(`Data in server. First repo: ${data[0].full_name}`)
      // save repos
      db.save(data)
    })
    .then(result => {
      console.log(`reached result: ${result}`)
      res.send(`Result of save: ${result}`);
    })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

