import React, { Component } from 'react';

class Book extends Component {
	render() {
		return (
			<div>
				<div>
					{this.props.book.bookTitle} ({this.props.book.id})
				</div>
			</div>
		)
	}
}

export default Book;