import gql from 'graphql-tag'

export const BOOKS_QUERY = gql `
	query allBooksQuery {
		books{
			id
			bookTitle
		}
	}
`

// export const BOOKS_QUERY = 
// 	gql`{books}`