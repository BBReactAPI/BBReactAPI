import React, { Component } from 'react';
import logo from './warehouse.svg';
import axios from 'axios';
import api from './Api.js'
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
      url: '',
      isAddProductFormShown: false,
      newItemValue:''
      }
    }

  componentDidMount() {
    this.getProducts()
  }

  getProducts(){
    axios.get(api() + '/products')
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
      price: 1,
      shipping: 0,
      upc: 'upcHere',
      image: this.state.image,
      description: this.state.description,
      url: this.state.url
      };
      axios.post(api() + '/products', newItem).then((added) => {
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
      // console.log(api() + '/products/'+id)
      axios.delete(api() + '/products/'+id).then((response) => {
        this.getProducts()
      })
      // console.log("Your item has been deleted.")
    } else {
      // console.log("Your item has not been deleted.")
    }
  }

  onNewSearchName(e){
    this.setState({
      newItemValue: e.target.value
    })
  }

  onNewButtonSearch(e) {
    this.setState({
      newItemValue: e.target.value
    })
  }

  onSearchSubmit(e) {
    e.preventDefault();
    if (e.target.value === '' || e.target.value === null) {
      // console.log('please enter text');
    }
    axios.get(api() + '/products?name[$like]=*' + this.state.newItemValue + '*&$sort[price]=-1&$limit=12')
    .then((response) => {
      var newInventory = response.data.data.slice(0);
      this.setState({
        inventory: newInventory,
        newItemValue: ''
      })
    }).catch(function (error) {
      console.log(error);
    });
  }

  itemFormToggle(e) {
    e.preventDefault();
    // console.log(!this.state.isAddProductFormShown);
    this.setState({
      isAddProductFormShown: !this.state.isAddProductFormShown
    })
  }

  renderAddProductForm(){
    return(
        <form onSubmit={this.onFormSubmit.bind(this)} className="inputList">
          <p className="submitWords">Name</p><input onChange={this.onChanged.bind(this, 'name')} type='text' value={this.state.name} placeholder='product name'/>
          <p className="submitWords">Type</p><input onChange={this.onChanged.bind(this, 'type')} type='text' value={this.state.type} placeholder='product type'/>
          <p className="submitWords">Price</p><input onChange={this.onChanged.bind(this, 'price')} type='number'  value={this.state.price} placeholder='price'/>
          <p className="submitWords">UPC</p><input onChange={this.onChanged.bind(this, 'UPC')} type='text' value={this.state.upc} placeholder='product UPC'/>
          <p className="submitWords">Description</p><input onChange={this.onChanged.bind(this, 'description')} type='text' value={this.state.description} placeholder='description'/>
          <p className="submitWords">Model</p><input onChange={this.onChanged.bind(this, 'model')} type='text' value={this.state.model} placeholder='model'/>
          <p className="submitWords">URL</p><input onChange={this.onChanged.bind(this, 'url')} type='text' value={this.state.url} placeholder='product url'/>
          <p className="submitWords">Image URL</p><input onChange={this.onChanged.bind(this, 'image')} type='text' value={this.state.image} placeholder='image url'/>
          <input type="submit" value="Submit" className="addmeButton" />
        </form>
    )
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
        <button className="add-product" onClick={this.itemFormToggle.bind(this)}>Add Product</button>
        <hr className="line"></hr>
        {this.state.isAddProductFormShown ? this.renderAddProductForm() : null}
        <form  onSubmit={this.onSearchSubmit.bind(this)}>
          <input className="search" onChange={this.onNewSearchName.bind(this)} value={this.state.newItemValue} placeholder="search for product" />
          <button className="search-button" onClick={this.onNewButtonSearch.bind(this)} value={this.state.newItemValue}>Go</button>
        </form>
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
