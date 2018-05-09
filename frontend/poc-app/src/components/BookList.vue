<template>
	<div class="booklist">
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
		data () {
			return {
				books: []
			}
		},
		components: {
			BookItem
		},
		apollo: {
			books: {
				query: BOOKS_QUERY
			}
		}
	}
</script>
