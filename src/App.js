import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
const query = 'harry potter';
const API = 'https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ hits: data.books }));
  }
  render () {
    const { books } = this.state;
    return (
      <div className="App">
      <ul>
        {books.map(q =>
          <li key={q.intitle}>
            <a href={q.intitle}></a>
          </li>
        )}
      </ul>
      </div>
    );
  }
}

export default App;
