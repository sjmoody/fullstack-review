import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.componentDidMount = this.componentDidMount.bind(this);

  }

  componentDidMount() {
    console.log("Component did mount")
    $.get('/repos')
    .then(response => {
      console.log(response)
      this.setState({repos: response})
    })
  }



  search (term) {
    console.log(`${term} was searched`);
    // TODO: use jQ ajax to send a POST request
    $.ajax({
      url: '/repos',
      type: 'POST',
      contentType: "application/json",
      data: JSON.stringify({term}),
      success: function(result) {console.log(result)}

    })
   }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));