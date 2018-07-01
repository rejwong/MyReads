import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Bookshelf from './templates/Bookshelf';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Search from './templates/Search';

class BooksApp extends React.Component {
  state = {
    shelves: [
      {
        id: 'currentlyReading',
        name: 'Currently Reading'
      },
      {
        id: 'wantToRead',
        name: 'Want To Read'
      },
      {
        id: 'read',
        name: 'Read'
      }
    ],
    data:[],
    query: '',
    results: [],
    isWorking: false
  }

  // My loader to alert the user that the service is working
  toggleWorking() {
    this.setState((prevState)=>{
      prevState.isWorking = !prevState.isWorking;
      return prevState
    })
  }

  // updates the shelf of the book for both home and search pages
  updateShelf = (shelf, book) => {
    this.toggleWorking();

    // update backend to reflect the new change
    BooksAPI.update(book, shelf)
    // then update react state
    .then(()=>{
      this.toggleWorking();

      // update state.data by fetching a fresh list
      BooksAPI.getAll()
      .then(data => {
        this.setState({data});
        return;
      })
      // once the data array is up to date we can then update the search results array
      .then(()=>{
        this.updateSearchResults(this.state.results);
      })
    })
    .catch(()=>(console.error('Could on update shelf')));
  }

  // this function checks to see if any books in the home page are present in the search
  // if found then update the shelf property to refelct the correct shelf, else mark the shelf as none
  updateSearchResults(arrayToCheck){
    if (arrayToCheck && arrayToCheck.length > 0){
      let updatedSearch = arrayToCheck.map((book)=>{
        let matchedBook = this.state.data.find((b)=> b.id === book.id);
        if (matchedBook){
          book.shelf = matchedBook.shelf;
        } else {
          book.shelf = 'none';
        }
        return book;
      });

      // updates search results state
      // if none return an empty array
      this.setState((prevState) => ({
        results: updatedSearch || []
      }));
    }
  }

  // handles queries from search bar
  handleSearchInput = (e) => {
    // set search query in state
    this.setState({
      query: e
    });

    let q = e.trim();

    // Get search results
    // If query is empty don't search
    if(q.length > 1){
      BooksAPI.search(q)
      .then((response) => {
        this.updateSearchResults(response);
        return response;
      })
      .catch((response)=>{
        console.log('invalid search');
        return response;
      });
    } else if (q.length === 0 || q.length === 1){
      this.setState({
        results: []
      })

    }
  }

  // Get books on componentDidMount event
  componentWillMount(){
    BooksAPI.getAll().then(data => {
      this.setState({data});
    });
  }

  render() {

    const {isWorking} = this.state;

    return (
      <div className="app">

        <div className={`is-working ${isWorking ? 'is-expanded' : ''}`}>
          <h3>Working...</h3>
        </div>

        <Route exact path="/search" render={()=>(
          <Search
            updateShelf={this.updateShelf}
            handleInput={this.handleSearchInput}
            searchResults={this.state.results}
            inputQuery={this.state.query}
          />
        )} />

        <Route exact path="/" render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.state.shelves.map((shelf)=>(
                  <Bookshelf
                    key={shelf.id}
                    shelfName={shelf.name}
                    books={this.state.data.filter(book=>book.shelf === shelf.id)}
                    updateShelf={this.updateShelf}
                  />
                ))}
              </div>
            </div>
            <div className="open-search">
              <Link to="/search" >Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
