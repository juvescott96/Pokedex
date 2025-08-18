let allPokemonData = [];

let currentIndex = 0;

async function loadAllPokemon() {

    loading();
    try {
        await fetchPokemonAPI();
        await renderPokemonList(allPokemonData);
    } catch (error) {
        console.log('Error fetching Pokémon data:', error);
    }
    afterLoad();
}


function loading() {
    let loadingElement = document.getElementById('loading');
    let content = `<div class="loader"></div>`;
    loadingElement.innerHTML = content;
    setTimeout
}

function afterLoad() {
    let loadingElement = document.getElementById('loading');
    loadingElement.innerHTML = '';
}


async function fetchPokemonAPI() {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30');
    let allpokemon = await response.json();

    for (let pokemon of allpokemon.results) {
        let pokemonData = await fetchPokemonData(pokemon);
        let evolutionData = await fetchEvolutionChain(pokemonData.species.url);

        pokemonData.evolution = evolutionData;
        allPokemonData.push(pokemonData);
    }

    renderPokemonList(allPokemonData);
    console.log(allPokemonData);
}

async function fetchEvolutionChain(speciesUrl) {
    try {

        let speciesRes = await fetch(speciesUrl);
        let speciesData = await speciesRes.json();

        let evoRes = await fetch(speciesData.evolution_chain.url);
        let evoData = await evoRes.json();

        let names = [];
        function traverse(evo) {
            names.push(evo.species.name);
            evo.evolves_to.forEach(next => traverse(next));
        }
        traverse(evoData.chain);

        let sprites = [];
        for (let name of names) {
            let pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            let pokeData = await pokeRes.json();
            sprites.push({
                name: pokeData.name,
                sprite: pokeData.sprites.front_default
            });
        }

        return sprites;
    } catch (err) {
        console.error("Fehler Evolution Chain:", err);
        return [];
    }
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
    if (!overlay.classList.contains('d_none')) {
        document.body.classList.add('noscroll');
    } else {
        document.body.classList.remove('noscroll');
    }
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
    currentIndex = (currentIndex + 1) % allPokemonData.length;
    pokemonOverlay(allPokemonData, currentIndex);
}

document.getElementById('searchInput').addEventListener('input', function (e) {
    const searchValue = e.target.value.toLowerCase();

    if (searchValue.length >= 3) {
        const filtered = allPokemonData.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchValue)
        );
        renderPokemonList(filtered);
    } else {
        // z.B. wieder alle anzeigen oder Liste leeren
        renderPokemonList(allPokemonData);
        // oder: renderPokemonList([]); wenn du es leer haben willst
    }
});