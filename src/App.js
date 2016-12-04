import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import List from './newList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: this.props.inventory
      }
    }
  getApiInfo(e) {
    e.preventDefault();
    axios.get('http://localhost:3030/products?$select[]=name&$select[]=id&$select[]=model&$select[]=description&$select[]=image&$select[]=url&$select[]=price&$select[]=shipping&$sort[price]=-1&$limit=12')
    .then((response) => {
      var newInventory = response.data.data.slice(0);
      this.setState({
        inventory: newInventory
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  onSubmit(e) {
    e.preventDefault();
    let inventory
    let newItem = {
      name: this.state.name,
      type: 'typeGoesHere',
      model: this.state.model,
      price: parseInt(this.state.price),
      upc: 'upcGoesHere',
      image: this.state.image,
      description: this.state.description,
      url: this.state.url
      };
      axios.post('http://localhost:3030/products', newItem).then((added) => {
        axios.get('http://localhost:3030/products?$sort[price]=-1').then((response) => {
          inventory = response.data.data
          this.setState({inventory})
        })
      })
    }

    whenChanged(field, e) {
      var change = {};
      change[field] = e.target.value;
      this.setState(change);
    }


  onDeleteClick(id, e) {
    console.log("You clicked delete, my friend!", id);

    var confirmed = confirm("Are you sure you want to delete this this for good?")
    if (confirmed === true){
      console.log('http://localhost:3030/products/'+id)
      axios.delete('http://localhost:3030/products/'+id)
    } else {
      console.log("hi")
    }

  }


  render() {
    if (this.state.inventory.length === 0) {
      return false
    }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>"BB API of Fun"</h2>
        </div>
        <form onSubmit={this.getApiInfo.bind(this)}>
          <input onChange={this.whenChanged.bind(this, 'name')} type='text' value={this.state.name} placeholder='products'/>
          <input onSubmit={this.getApiInfo.bind(this)}  placeholder="words"></input>
        </form>
        <p className="App-intro">
          Stuff
        </p>
        <List
          inventory={this.state.inventory}
          getApiInfo={this.getApiInfo.bind(this)}
          onDeleteClick={this.onDeleteClick.bind(this)}
        />
      </div>
    );
  }
}

export default App;
