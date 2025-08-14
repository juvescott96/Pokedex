

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
                    <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                    <p>N° ${pokemonData.id}</p>
                    <h4>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h4>
                    <ul>
                     ${pokemonData.types.map(type => ` <li class="bg_${type.type.name}">${type.type.name}</li>`).join('')}
                    </ul>
                    <div>
                    <button onclick="left(event)">left</button>
                    <button onclick="right(event)">right</button>
                    </div>
                    <div class="pokemon-details">
                    <div>
                    <h5>Height</h5>
                    <p class="p-overlay">${pokemonData.height / 10} m</p>
                    </div>
                    <div>
                    <h5>Weight</h5>  
                    <p class="p-overlay">${pokemonData.weight / 10} kg</p>
                    </div>
                    </div>
                    <p>Base Experience: ${pokemonData.base_experience}</p>
                    <p>Abilities:</p> 
                    <ul>
                     ${pokemonData.abilities.map(ability => ` <li>${ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}</li>`).join('')}
                    </ul>

                    
                    </div>
                  `;
  overlay.innerHTML = overlayContent;
}

