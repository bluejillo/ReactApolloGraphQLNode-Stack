<template>
	<div>
		{{book.bookTitle}}
	</div>
</template>

<script>
	export default {
		name: 'BookItem',
		props: ['book']
	}
</script>