<template>
	<div>
		<h4 v-if="loading">Loading ...</h4>
		<book-item 
		v-for="book in books"
		:key="book.id"
		:book="book"></book-item>
	</div>
</template>

<script>
	import { BOOKS_QUERY } from '../constants/graphql.js'
	import BookItem from './BookItem.vue'

	export default {
		name: 'BookList',
		components: {
			BookItem
		},
		data () {
			return {
				books: [
					// {
					// 	name: 'book1',
					// 	id: '1'
					// },
					// {
					// 	name: 'book2',
					// 	id: '2'
					// }
				],
				loading: 0
			}
		},
		apollo: {
			books: {
				query: BOOKS_QUERY
			}
		}
	}
</script>
