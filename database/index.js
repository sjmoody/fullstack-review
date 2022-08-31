const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: {
    type:String,
    required:true,
    unique: true
  },
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

let save = (repos) => {
  console.log(`Saving in db! Size: ${repos.length}`)
  for (var r of repos) {
    console.log(`Repo to save: ${r.full_name} with id: ${r.id}`)
    let doc = { // init the sub doc to try save
      id: r.id,
      name: r.name,
      full_name: r.full_name,
      html_url: r.html_url,
      description: r.description, // often null
      created_at: r.created_at,
      size: r.size,
      stargazers_count: r.stargazers_count,
      watchers_count: r.watchers_count,
      forks_count: r.forks_count,
      owner: {
        login: r.owner.login,
        id: r.owner.id
      }
    }
    // const res =  Repo.replaceOne({id: doc.id}, {doc}, {upsert: true} )
    const res = Repo.findOneAndUpdate({id: doc.id}, {doc}, {upsert:true})
    res.then((data) => {
      console.log(`Previous document for id ${doc.id}: ${data._id} matching repo id ${data._id}`)

    })




    // console.log(`doc created to try save. id: ${doc.id}; owner: ${doc.owner.login}; owner id: ${doc.owner.id}; name: ${doc.name}; description: ${doc.description}; size: ${doc.size}; stargazers: ${doc.stargazers_count}; watchers: ${doc.watchers_count}; forks: ${doc.forks_count}`)
  }
  return repos.length
}
// let save = (/* TODO */) => {
//   // TODO: Your code here
//   // This function should save a repo or repos to
//   // the MongoDB
// }

module.exports.save = save;