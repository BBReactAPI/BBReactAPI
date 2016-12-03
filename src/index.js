import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

let inventory = [
  {
    "name": "Product name",
    "id": null,
    "model": "Product model",
    "description": "Product description",
    "image": "Product image url",
    "url": "Product url",
    "price": null,
    "shipping": null
  }
]

ReactDOM.render(
  <App inventory={inventory}/>,
  document.getElementById('root')
);
