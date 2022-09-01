import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      total: 0
    }
    // this.componentDidMount = this.componentDidMount.bind(this);

  }

  componentDidMount() {
    console.log("Component did mount")
    $.get('/repos')
    .then(response => {
      console.log(response)
      this.setState({
        repos: response.docs,
        total: response.total})
    })
  }

  searchRpp2205() {
    console.log("Big search initiated")
    let studentsArr = [
      'wulfmatik', 'bbissing', 'camjhirsh', 'chelseapae', 'puhpx', 'VoidWizid', 'dkim1017', 'malexander6',
      'bubsinthemountains', 'huantran123', 'KenKurita', 'KDD87', 'mattdailey173', 'matthewrmcivor', 'romanlaughs',
      'netbek932', 'h-sheeva', 'taoshika127', 'staceypereira1', 'sjmoody', 'viviennema', 'daisydingdx', 'pyc0422',
      'Yui1002', 'yunsupj', 'zacharyatha']
      for (var student of studentsArr) {
        this.search(student)
      }
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: '/repos',
      type: 'POST',
      contentType: "application/json",
      data: JSON.stringify({term})
    })
    .then(response => {
      this.setState({
        repos: response.docs,
        total: response.total
      })
    })
    // $.ajax({
    //   url: '/repos',
    //   type: 'POST',
    //   contentType: "application/json",
    //   data: JSON.stringify({term}),
    //   success: function(result) {
    //     console.log(`success from search: ${result}`)
    //   }

    // })
   }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} total={this.state.total}/>
      <Search onSearchRpp2205={this.searchRpp2205.bind(this)} onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));