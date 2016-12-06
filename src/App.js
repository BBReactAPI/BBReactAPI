import React, { Component } from 'react';
import logo from './re-sell-logo.png';
import axios from 'axios';
import './App.css';
import List from './newList';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: this.props.inventory,
      name: '',
      type: '',
      model: '',
      shipping: 0,
      price: '',
      UPC: '',
      image: '',
      description: '',
      url: ''
      }
    }
  componentDidMount() {
    this.getProducts()
  }
  getProducts(){
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

  onFormSubmit(e) {
    e.preventDefault();
    let newItem = {
      name: this.state.name,
      type: 'typeHere',
      ID: this.state.id,
      model: this.state.model,
      price: 10000,
      shipping: 0,
      upc: 'upcHere',
      image: this.state.image,
      description: this.state.description,
      url: this.state.url
      };
      axios.post('http://localhost:3030/products', newItem).then((added) => {
        this.getProducts()
      })
    }
  onChanged(field, e) {
      var changed = {};
      changed[field] = e.target.value;
      this.setState(changed);
    }

  onDeleteClick(id, e) {
    var confirmed = confirm("Are you sure you want to delete this for good?")
    if (confirmed === true){
      console.log('http://localhost:3030/products/'+id)
      axios.delete('http://localhost:3030/products/'+id).then((response) => {
        this.getProducts()
      })
      console.log("Your item has been deleted.")
    } else {
      console.log("Your item has not been deleted.")
    }
  }

  onNewSearchName(e){
    this.setState({
      newItemValue: e.target.value
    })
  }

  onSearchSubmit(e) {
    e.preventDefault();
    axios.get('http://localhost:3030/products?name[$like]=*' + this.state.newItemValue + '*&$sort[price]=-1&$limit=12')
    .then((response) => {
      var newInventory = response.data.data.slice(0);
      this.setState({
        inventory: newInventory,
        newItemValue: ''

      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    if (this.state.inventory.length === 0) {
      return false
    }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Product List API</h2>
        </div>
        <form onSubmit={this.onSearchSubmit.bind(this)}>
          <input onChange={this.onNewSearchName.bind(this)} value={this.state.newItemValue} placeholder="search for product..." />
        </form>
          <form onSubmit={this.onFormSubmit.bind(this)} className="inputList">
            <p className="submitWords">Name</p><input onChange={this.onChanged.bind(this, 'name')} type='text' value={this.state.name} placeholder='product name'/>
            <p className="submitWords">Type</p><input onChange={this.onChanged.bind(this, 'type')} type='text' value={this.state.type} placeholder='product type'/>
            <p className="submitWords">Price</p><input onChange={this.onChanged.bind(this, 'price')} type='number' min="10000" value={this.state.price} placeholder='price'/>
            <p className="submitWords">UPC</p><input onChange={this.onChanged.bind(this, 'UPC')} type='text' value={this.state.upc} placeholder='product UPC'/>
            <p className="submitWords">Description</p><input onChange={this.onChanged.bind(this, 'description')} type='text' value={this.state.description} placeholder='description'/>
            <p className="submitWords">Model</p><input onChange={this.onChanged.bind(this, 'model')} type='text' value={this.state.model} placeholder='model'/>
            <p className="submitWords">URL</p><input onChange={this.onChanged.bind(this, 'url')} type='text' value={this.state.url} placeholder='product url'/>
            <p className="submitWords">Image URL</p><input onChange={this.onChanged.bind(this, 'image')} type='text' value={this.state.image} placeholder='image url'/>

            <input type="submit" value="Submit" className="addmeButton" />
          </form>
        <p className="App-intro">
          Results
        </p>
        <List
          inventory={this.state.inventory}
          onDeleteClick={this.onDeleteClick.bind(this)}
        />
        <div className="App-footer">
        <p className="bb-words">Data Courtesy of</p>
        <a href="https://developer.bestbuy.com">
          <img src="https://developer.bestbuy.com/images/bestbuy-logo.png" className="bbIcon" alt="Best Buy Developer" />
        </a>
        </div>
      </div>
    );
  }
}

export default App;
