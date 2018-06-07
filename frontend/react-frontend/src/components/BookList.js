import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
// import Book from './Book';

const getBooksQuery = gql `
	{
		books{
			id
			bookTitle
			genre
			author {
				firstName
			}
		}
	}
`

class BookList extends Component {
	displayBooks(){
		var data = this.props.data;
		if(data.loading){
			return(<div> Loading books...</div>);
		} else {
			return data.books.map(book => {
				return(
					<li key={book.id}>{book.bookTitle} - {book.genre} - {book.author.firstName}</li>
				);
			})
		}
	}
	render () {
		return(
			<div>
				<ul id="book-list">
					{ this.displayBooks() }
				</ul>
			</div>
		)
	}
}

// export default graphql(BOOKLIST_QUERY, {name: 'bookQuery'}) (BookList);
export default graphql(getBooksQuery) (BookList);