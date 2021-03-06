const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull} = graphql;

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	//we wrap fields in a function because it will wait until its read the whole file before it executes 
	//otherwise it will never find BookType or AuthorType
	fields: () => ({
		firstName: {type: GraphQLString},
		age: {type: GraphQLInt},
		id: {type: GraphQLID},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args){
				// return _.filter(books, {authorId: parent.id});
				return Book.find({authorId: parent.id});
			}
		}
	})
});

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: {type: GraphQLID},
		bookTitle: {type: GraphQLString},
		genre: {type: GraphQLString},
		author: {
			type: AuthorType,
			resolve(parent, args){
				// return _.find(authors, {id: parent.authorId});
				return Author.findById(parent.authorId);
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args){
				// return _.find(books, {id: args.id});
				return Book.findById(args.id);
			}
		},
		author: {
			type: AuthorType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args){
				// return _.find(authors, {id: args.id});
				return Author.findById(args.id);
			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args){
				// return books;
				return Book.find({});
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args){
				// return authors;
				return Author.find({});
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				firstName: {type: GraphQLString},
				age: {type: GraphQLInt}
			},

			resolve(parent, args){
				let author = new Author({
					firstName: args.firstName,

					age: args.age
				});

				return author.save();
			}
		},
		addBook: {
			type: BookType,
			args: {
				bookTitle: {type: new GraphQLNonNull(GraphQLString)},
				genre: {type: new GraphQLNonNull(GraphQLString)},
				authorId: {type: new GraphQLNonNull(GraphQLID)}
			},
			resolve(parent, args){
				let book = new Book({
					bookTitle: args.bookTitle,
					genre: args.genre,
					authorId: args.authorId
				});

				return book.save();
			}
		},
		deleteBook: {
			type: BookType,
			args: {
				id: {type: GraphQLID}
			},
			resolve(parent, args){
				const removeBook = Book.findByIdAndRemove(args.id);
				if(!removeBook){
					throw new Error('Error');
				}

				return removeBook;
			}
		},
		deleteAuthor: {
			type: AuthorType,
			args: {
				id: {type: GraphQLID}
			},
			resolve(parent, args){
				const removeAuthor = Author.findByIdAndRemove(args.id);
				if(!removeAuthor){
					throw new Error('Error');
				}
				return removeAuthor;
			}
		},
		updateBook: {
			type: BookType,
			args: {
				id: {type: GraphQLID},
				bookTitle: {type: GraphQLString},
				genre: {type: GraphQLString},
				authorId: {type: GraphQLID}
			},
			resolve(parent, args){
				const updateBook = Book.findByIdAndUpdate(
					args.id,
					{$set: {
						bookTitle: args.bookTitle,
						genre: args.genre,
						authorId: args.authorId
					}}
				);

				if(!updateBook){
					throw new Error('Error');
				}
				return updateBook;
			}
		},
		updateAuthor: {
			type: AuthorType,
			args: {
				id: {type: GraphQLID},
				firstName: {type: GraphQLString},
				age: {type: GraphQLInt}
			},
			resolve(parent, args){
				const updateAuthor = Author.findByIdAndUpdate(
					args.id,
					{$set: {
						firstName: args.firstName,
						age: args.age
					}}
				);

				if(!updateAuthor){
					throw new Error('Error');
				}

				return updateAuthor;
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});