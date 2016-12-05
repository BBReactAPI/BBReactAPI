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
                <div className="description">{item.description}</div>
                <br />
                <div className="price">${item.price}</div>
                <br />
                <i className="icon ion-trash-a" onClick={this.props.onDeleteClick.bind(this, item.id)} key={item.id}></i>
                <br />
                <div className="underline"></div>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default List;
