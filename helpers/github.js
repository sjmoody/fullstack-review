const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    baseURL: `https://api.github.com`,
    url: `/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  return axios(options)
    .then(function(response) {
      console.log(`${response.data.length} Repos found`);
      console.log(`First Repo: ${response.data[0].full_name} `)
      // console.log(response.data[0])
      return response.data;
    })
}

module.exports.getReposByUsername = getReposByUsername;