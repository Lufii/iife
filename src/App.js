import React, { useState, Component } from 'react';
import './App.css';
import AppDisplay from './AppDisplay.js'
const axios = require('axios');

function Button(props) {
  return (
    <div onClick={props.togglePage}>
      {props.label}
    </div>
  );
}

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      activePage: 'home(init)',
      showList: []
    }
  }

  componentDidMount(){
    axios
      .get('https://stormy-castle-25399.herokuapp.com/people')
      .then(({ data })=> {
        console.log(data);
        this.setState(
          {
            showList: data
          }
        );
      })
      .catch((err)=> {})
    }

  render() {
    return (
      <div className="App">
        <header className="App-body">
          <div className = 'appMenu'>
            <Button
            label = 'Home'
            togglePage = {()=>this.setState({activePage: 'home'})}
            />
            <Button
            label = 'Add'
            togglePage = {()=>this.setState({activePage: 'add'})}
            />
            <Button
            label ='Search'
            togglePage = {()=>this.setState({activePage: 'search'})}
            />
            </div>
          <AppDisplay list={this.state.showList} activePage={this.state.activePage}/>
        </header>
      </div>
    );
  }
}

export default App;
