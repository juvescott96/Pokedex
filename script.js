let allPokemonData = [];

let currentIndex = 0;

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
    await new Promise(resolve => setTimeout(resolve, 500));

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
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
    let allpokemon = await response.json();

    for (let pokemon of allpokemon.results) {
        let pokemonData = await fetchPokemonData(pokemon);
        allPokemonData.push(pokemonData);

    }
    renderPokemonList(allPokemonData);
    console.log(allPokemonData);
}

async function fetchPokemonData(pokemon) {
    let response = await fetch(pokemon.url);
    return await response.json();
}

function toggleOverlay(index) {
    let overlay = document.getElementById('pokemon-overlay');
    currentIndex = index;
    pokemonOverlay(allPokemonData, currentIndex);
    overlay.classList.toggle('d_none');
}

function innerLogDown(event) {
    event.stopPropagation();
}

function left(event) {
    event.stopPropagation();
    currentIndex = (currentIndex - 1 + allPokemonData.length) % allPokemonData.length;
    pokemonOverlay(allPokemonData, currentIndex);
}

function right(event) {
    event.stopPropagation();
    currentIndex = (currentIndex + 1 ) % allPokemonData.length;
    pokemonOverlay(allPokemonData, currentIndex);
}

document.getElementById('searchInput').addEventListener('input', function (e) {
    const searchValue = e.target.value.toLowerCase();

    const filtered = allPokemonData.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchValue)
    );

    renderPokemonList(filtered);
});