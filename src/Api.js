import React, { Component } from 'react';
import axios from 'axios';

export default function api() {
  if (process.env.NODE_ENV === 'production') {
    return 'https://bestbuy.now.sh';
  } else {
    return 'http://localhost:3030';
  }
};
