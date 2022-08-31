const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: String,
  name: String,
  full_name: String,
  html_url: String,
  description: String,
  created_at: Date, //  string if date ==> high effort
  size: Number,
  stargazers_count: Number,
  watchers_count: Number,
  forks_count: Number,
  owner: {
    login: String,
    id: String
  }

});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;