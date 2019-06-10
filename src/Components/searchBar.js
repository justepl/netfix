import React, { Component } from 'react';
import "../style/searchBar.css"

class SearchBar extends Component{
  constructor(props) {
    super(props)

    this.state = {
      searchText: "",
      placeholder: "Tapez votre film",
      intervalBeforeRequest: 1000,
      lockRequest: false,
    }
  }

  render() {
    return(
        <div className={"divSearchBar"}>
          <input className={"searchBar"} onChange={this.handleChange.bind(this)} placeholder={this.state.placeholder}/>
        </div>
    )
  }

  handleChange(event) {
    this.setState({searchText: event.target.value});
    if(!this.state.lockRequest) {
      this.setState({lockRequest: true});
      setTimeout(function () {
        this.search()
      }.bind(this), this.state.intervalBeforeRequest)
    }
  }

  search() {
    this.props.callback(this.state.searchText);
    this.setState({lockRequest: false});
  }
}

export default SearchBar;
