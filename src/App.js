import React, { Component } from 'react';
import './App.css';
import AppDisplay from './AppDisplay.js'
const axios = require('axios');

function Button(props) {
  return (
    <div className='menuButton' onClick={props.togglePage}>
      {props.label}
    </div>
  );
}

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      personOperation: {},
      activePage: 'home',
      showList: []
    }
  }

  requestList(){
    axios
      .get('https://stormy-castle-25399.herokuapp.com/people')
      .then(({ data })=> {
        this.setState(
          {
            showList: data
          }
        );
      })
      .catch((err)=> {})
  }

  componentDidMount(){
    this.requestList();
    }

  toggleEdit(person, activePage){
        this.setState({personOperation: person});
        this.setState({activePage: activePage});
  }

  toggleDelete(person, activePage){
        this.setState({personOperation: person});
        this.setState({activePage: activePage});
        let newPeople = this.state.showList;
        for(let i in newPeople){
          if(newPeople[i].id===person)
            newPeople.splice(i,i);
        this.setState({showList: newPeople});
        }
  }

  toggleDetails(person, activePage){
      this.setState({personOperation: person});
      this.setState({activePage: activePage});
    }

  render() {
    return (
      <div className="App">
        <header className="App-body">
          <div className = 'appMenu'>
            <Button
            label = 'Home'
            togglePage = {()=>{
            this.setState({activePage: 'home'})
            this.requestList();
          }}
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
          <AppDisplay
          list={this.state.showList}
          activePage={this.state.activePage}
          toggleEdit={this.toggleEdit.bind(this)}
          toggleDetails={this.toggleDetails.bind(this)}
          toggleDelete={this.toggleDelete.bind(this)}
          person={this.state.personOperation}/>
        </header>

      </div>
    );
  }
}

export default App;
