function fetchPokemonAPI() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=5')
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

function renderPokemon(pokemonData) {
    let allPokemonContainer = document.getElementById('pokemon-card');
    let pokeContainer = document.createElement("div")
    pokeContainer.classList.add("card-pokemon");
    let pokeName = document.createElement('h4')
    pokeName.innerText = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
    let pokeNumber = document.createElement('p')
    pokeNumber.innerText = `#${pokemonData.id}`
    let pokeTypes = document.createElement('ul')
    pokemonData.types.forEach(function (type) {
        let pokeType = document.createElement('li');
        pokeType.innerText = type.type.name;
        pokeTypes.appendChild(pokeType);
    });
    let pokeImage = document.createElement('img');
    pokeImage.src = pokemonData.sprites.front_default;
    pokeContainer.append(pokeImage, pokeName, pokeNumber, pokeTypes);
    allPokemonContainer.appendChild(pokeContainer);
}
