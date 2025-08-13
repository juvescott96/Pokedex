

function renderPokemonList(pokemonArray,) {
    let allPokemonContainer = document.getElementById('pokemon-card');
    allPokemonContainer.innerHTML = '';

    pokemonArray.forEach((pokemonData, index) => {
         let content = `
                    <div onclick="toggleOverlay(${index})" class="content-pokemon">
                    <h4>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h4>
                    <p>N° ${pokemonData.id}</p>
                    <ul>
                     ${pokemonData.types.map(type => ` 
                      <li class="bg_${type.type.name}">${type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</li>`).join('')}
                    </ul>
                    <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                    </div>
                  `;

    allPokemonContainer.innerHTML += content;
    });
}

function pokemonOverlay(allPokemonData, index) {
  let overlay = document.getElementById('pokemon-overlay');
  let pokemonData = allPokemonData[index];
  let overlayContent = `
                    <div onclick="toggleOverlay(${index})" class="overlay">
                    <div onclick="innerLogDown(event)" class="pokemon-overlay-content">
                    <button class="close-button" onclick="toggleOverlay(${index})">X</button>
                    <div>
                    <button onclick="left(event)">left</button>
                    <button onclick="right(event)">right</button>
                    </div>
                    <h4>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h4>
                    <p>N° ${pokemonData.id}</p>
                    <ul>
                     ${pokemonData.types.map(type => ` <li class="bg_${type.type.name}">${type.type.name}</li>`).join('')}
                    </ul>
                    <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                    </div>
                  `;
  overlay.innerHTML = overlayContent;
}

