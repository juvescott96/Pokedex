let allPokemonData = [];

async function loadAllPokemon() {
    try {
        await loadAPI();
    } catch (error) {
        console.error('Error loading Pokémon data:', error);
    }
    await afterLoad();
    fetchPokemonAPI();

}

async function loadAPI() {
    loading();
    await new Promise(resolve => setTimeout(resolve, 3000));

}

function loading() {
    let loadingElement = document.getElementById('loading');
    let content = `<div class="loader"></div>`;
    loadingElement.innerHTML = content;
}

function afterLoad() {
    let loadingElement = document.getElementById('loading');
    loadingElement.innerHTML = '';
}


async function fetchPokemonAPI() {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=15');
    let allpokemon = await response.json();

    for (let pokemon of allpokemon.results) {
        let pokemonData = await fetchPokemonData(pokemon);
        allPokemonData.push(pokemonData);
        renderPokemonList(allPokemonData);
    }
}

async function fetchPokemonData(pokemon) {
    let response = await fetch(pokemon.url);
    return await response.json();
}



document.getElementById('searchInput').addEventListener('input', function (e) {
    const searchValue = e.target.value.toLowerCase();

    const filtered = allPokemonData.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchValue)
    );

    renderPokemonList(filtered);
});