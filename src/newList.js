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
                <span>{item.price}</span>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default List;
