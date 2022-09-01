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

// let save = (repos) => {
//   Promise.all(repos.map(r => {
//     let doc = { // init the sub doc to try save
//       id: r.id,
//       name: r.name,
//       full_name: r.full_name,
//       html_url: r.html_url,
//       description: r.description, // often null
//       created_at: r.created_at,
//       size: r.size,
//       stargazers_count: r.stargazers_count,
//       watchers_count: r.watchers_count,
//       forks_count: r.forks_count,
//       owner: {
//         login: r.owner.login,
//         id: r.owner.id
//       }
//     }
//     console.log(`Repo to save: ${doc.full_name} with id: ${doc.id}`)
//     Repo.findOneAndUpdate({id: doc.id}, {doc}, {upsert:true})
// }))
//   .then((arrayOfData) => {
//   console.log(arrayOfData)
// })
// }

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
    const res =  Repo.replaceOne({id: doc.id}, doc, {upsert: true} )
    // const res = Repo.findOneAndUpdate({id: doc.id}, {doc}, {upsert:true})
    res.then((data) => {
      data && data._id && console.log(`Previous document for id ${doc.id}: ${data._id} matching repo id ${data.id}`)

    })
  }
  console.log(`Finished saving in db. Size: ${repos.length}`) // this is not async
  return repos.length
}

// let retrieveTop25 = async () => {
//   const res = await Repo.find({}).sort({watchers_count: 1}).limit(25);
//   console.log(res.length)

// }

let retrieveTop25 = async () => {
  const query = Repo.find({}).sort({size: -1}).limit(25)
  const total = await Repo.count();
  const docs = await query;
  console.log(`docs returned. Total count: ${total} and shortlist: ${docs.length}`)
  return {docs, total}
  // return docs;


}

module.exports.save = save;
module.exports.retrieveTop25 = retrieveTop25;