import ApiClient from '../modules/ApiClient'

const client = new ApiClient({
	baseUrl: '/',
});

export default {
	get,
	pokemonRelease,
	pokemonCaught,
	pokemonCount,
	myList,
	getFromPokemonAPI
}

async function get() {
	return client.get();
}

async function pokemonRelease(data) {
	return client.post('/pokemon-release', data);
}

async function pokemonCaught(data) {
	return client.post('/pokemon-caught', data);
}

async function pokemonCount(data) {
	return client.post('/pokemon-count', data);
}

async function myList(data) {
	return client.get('/my-list', data);
}

async function getFromPokemonAPI(uri) {
	return fetch(uri)
}
