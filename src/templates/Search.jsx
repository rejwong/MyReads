import React from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

class Search extends React.Component {

  render() {

    let message;
    let {query, searchResults, handleInput } = this.props;

    if (query.length && !searchResults.length) {
      message = <h2 style={{opacity:0.4}} > No Results Found...</h2>;
    } else {
      message = '';
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          {/* Use link element here */}
          <Link className="close-search" to="/" >Close</Link>
            <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input type="text" onChange={(e)=>{handleInput(e.target.value)}} value={query} placeholder="Search by title or author"/>

            </div>
          </div>
        <div className="search-books-results">

          {message}

          <ol className="books-grid">
            {searchResults && searchResults.map((book)=>(
              <li key={book.id}>
                <Book book={book} updateShelf={this.props.updateShelf}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
