

function renderPokemonList(pokemonArray){
    let allPokemonContainer = document.getElementById('pokemon-card');
    allPokemonContainer.innerHTML = '';

    pokemonArray.forEach(pokemonData => {
         let content = `
                    <div class="content-pokemon">
                    <h4>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h4>
                    <p>N° ${pokemonData.id}</p>
                    <ul>
                     ${pokemonData.types.map(type => `<li>${type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</li>`).join('')}
                    </ul>
                    <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                    </div>
                  `;

    allPokemonContainer.innerHTML += content;
    });
}