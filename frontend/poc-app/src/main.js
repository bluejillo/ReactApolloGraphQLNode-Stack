import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import App from './App.vue'

Vue.config.productionTip = false

const httpLink = new HttpLink({
	uri: 'http://localhost:4200/graphql',
})

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
	link: httpLink,
	cache: cache,
	connectToDevTools: true
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
	defaultClient: apolloClient,
	defaultOptions: {
		$loadingKey: 'loading'
	}
}) 

new Vue({
  el:'#app',
  provide: apolloProvider.provide(),
  render: h => h(App)
})
