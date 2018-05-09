<template>
	<div>{{book.name}}</div>
</template>

<script>
	export default {
		name: 'BookItem',
		props: ['book']
	}
</script>