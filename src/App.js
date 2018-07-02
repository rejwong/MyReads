import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Bookshelf from './templates/Bookshelf';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Search from './templates/Search';
import escapeRegEx from 'escape-string-regexp';

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
    // then update react state.data
    .then(() => {
      this.setState((prevState) => {
        let indexBook = prevState.data.findIndex(b => b.id === book.id);
        prevState.data[indexBook].shelf = shelf
        return {
          data: prevState.data
        };
      });
    })
    .then(() => {
      // once the data array is up to date we can then update the search results array
      this.updateSearchResults(this.state.results);
      this.toggleWorking();
    })
    .catch(() => (console.error('Could not update shelf')));
  }

  // this function checks to see if any books in the home page are present in the search
  // if found then update the shelf property to refelct the correct shelf, else mark the shelf as none
  updateSearchResults(arrayToCheck){
    if (arrayToCheck) {
      let updatedSearch = arrayToCheck.map((book)=> {
        let matchedBook = this.state.data.find((b)=> b.id === book.id);
        if (matchedBook) {
          book.shelf = matchedBook.shelf;
        } else {
          book.shelf = 'none';
        }
        return book;
      });

      // save search results to state
      this.setState({results: updatedSearch});
    }
  }

  // handles queries from search bar
  handleSearchInput = (value) => {

    // set search query in state
    // once state fetch data
    this.setState({query: value}, () => {

      // Check if query exists
      if(escapeRegEx(this.state.query.trim())){
        BooksAPI.search(this.state.query.trim())
        .then(response => {
          if(response.length) {
            this.updateSearchResults(response);
          } else {
            // if no books are returned set empty state
            this.setState({results:[]});
          }
        })
        // if fetch fails
        .catch((response) => {
          console.warn('Could not get results, please check connection', response.length);
          this.setState({results:[]});
        });
      // if query is empty
      } else {
        this.setState({results:[]});
      }
    });
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
            query={this.state.query}
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
