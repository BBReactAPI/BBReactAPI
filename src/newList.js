import React, { Component } from 'react';
import './App.css';

class List extends Component {
  constructor() {
    super();
    this.state = {
    }
  }
  render() {
    return (
      <div className="List__Content">
        <button onClick={this.props.getApiInfo.bind(this)}>Get Data</button>
        <ul>
          {this.props.inventory.map((item, index) => {
            return (
              <li key={index}>
                <p className='name'>{item.name}</p>
                <span>Price in USD: {item.price}</span>
                <br />
                <span>Description: {item.description}</span>
                <br />
                <img role="presentation" src={item.image} />
                <br />
                <i className="icon ion-trash-a" onClick={this.props.onDeleteClick.bind(this, item.id)} key={item.id}></i>
              </li>

            )
          })}
        </ul>
      </div>
    );
  }
}

export default List;
