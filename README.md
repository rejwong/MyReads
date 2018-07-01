# MyReads Project
This is the 7th project completed as part of Udacity's Frontend Nanodegree, awarded through a Google Scholarship. The MyReads book tracking project focuses on knowledge of React and uses starter code provided by Udacity. The project tasks include creating new JS files for each component with import/require statements to ensure they are included where they are needed.

## Implementing the project
All of the items required for this project have been implemented as per the [rubic](https://review.udacity.com/#!/rubrics/918/view). I have also added a makeshift loader to give the user feedback when they are changing the shelf of a book.

## Create React App
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). There is more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Getting started
* install all project dependencies with `npm install`
* start the development server with `npm start`

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

## Backend Server
To simplify the development process, Udacity provided a backend server. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods needed to perform the necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`
Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`
Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`
Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). The list of terms are the _only_ terms that will work with the backend (searches for Basket Weaving or Bubble Wrap won't come back with any results).

## Things to improve
Given more time I would like to add some hints/icons in the search page to show which books have already been added and what shelf they are on. I have lots of ideas about additional features for this project!

