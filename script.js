function fetchPokemonAPI() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=30')
        .then(response => response.json())
        .then(function (allpokemon) {
            allpokemon.results.forEach(function (pokemon) {
                fetchPokemonData(pokemon);
            })
        })
}

function fetchPokemonData(pokemon) {
    let url = pokemon.url;
    fetch(url)
        .then(response => response.json())
        .then(function (pokemonData) {
            console.log(pokemonData);
            
            renderPokemon(pokemonData);;
        })
        .catch(function (error) {
            console.error('Error fetching Pokémon data:', error);
        })
}


