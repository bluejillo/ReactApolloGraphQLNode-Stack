<template>
	<div>
		<h4 v-if="loading">Loading ...</h4>
		<book-item v-for="book in books"
		v-bind:key="book.id"
		v-bind:book="book"></book-item>
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
				books:[],
				
				loading: 0
			}
		},
		apollo: {
			books: {
				query: BOOKS_QUERY,
				loadingKey: 'loading',
			},
		},
	};

	// export default {
	// 	name: 'BookList',
	// 	data:  function (){
	// 		return {
	// 			books: [],
	// 			loading: 0,
	// 		}
	// 	},
	// 	apollo: {
	// 		books: {
	// 			query: BOOKS_QUERY,
	// 			pollInterval: 300,
	// 			loadingKey: 'loading',
	// 		}
	// 	},
	// 	components: {
	// 		BookItem
	// 	}
	// };
	// export default {
	// 	name: 'BookList',
	// 	data:  function (){
	// 		return {
	// 			books: [{bookTitle:'testing'}],
	// 			loading: 0,
	// 		}
	// 	},
	// 	apollo: {
	// 		books () {
	// 			return{
	// 				query: BOOKS_QUERY,
	// 				pollInterval: 300,
	// 				loadingKey: 'loading',
	// 			}
	// 		}
	// 	},
	// 	components: {
	// 		BookItem
	// 	}
	// };

</script>
