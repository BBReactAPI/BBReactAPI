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
        <ul>
          {this.props.inventory.map((item, index) => {
            return (
              <li key={index}>
                <p className='name'>{item.name}</p>
                <br />
                <img  className="pictures" role="presentation" src={item.image} />
                <br />
                <span className="description">{item.description}</span>
                <br />
                <span className="price">${item.price}</span>
                <br />
                <i className="icon ion-trash-a" onClick={this.props.onDeleteClick.bind(this, item.id)} key={item.id}></i>
                <br />
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default List;
