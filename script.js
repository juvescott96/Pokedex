let allPokemonList = [];

function fetchPokemonAPI() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
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
            allPokemonList.push(pokemonData);
            
            renderPokemonList(allPokemonList);
        })
        .catch(function (error) {
            console.error('Error fetching Pokémon data:', error);
        })
}


document.getElementById('searchInput').addEventListener('input', function (e) {
    const searchValue = e.target.value.toLowerCase();

    const filtered = allPokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchValue)
    );

    renderPokemonList(filtered);
});