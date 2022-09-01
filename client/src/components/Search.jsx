import React from 'react';
import Button from 'react-bootstrap/Button';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
    this.searchRpp2205 = this.searchRpp2205.bind(this);
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  searchRpp2205(){
    this.props.onSearchRpp2205();
  }

  render() {
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: <input value={this.state.terms} onChange={this.onChange}/>
      <Button variant="outline-primary" onClick={this.search}> Add Repos </Button>
      <Button variant="outline-secondary" onClick={this.searchRpp2205}> Add all RPP2205 students</Button>
    </div>)
  }
}

export default Search;