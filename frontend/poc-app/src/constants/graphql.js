import gql from 'graphql-tag'

export const BOOKS_QUERY = gql `
	query booksQuery {
		books{
			id
			bookTitle
		}
	}
`