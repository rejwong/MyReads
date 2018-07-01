import React from 'react';
import Book from './Book';

const Bookshelf = function(props){

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">

            {props.books.map((book)=>(
              <li key = {book.id}>
                <Book
                  book={book}
                  updateShelf={props.updateShelf}
                />
              </li>
            ))}

          </ol>
        </div>
      </div>
    );

}
export default Bookshelf;
