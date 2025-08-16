

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
                    <img class="img-overlay" src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                    <h6>N° ${pokemonData.id}</h6>
                    <h4 class="h4-overlay">${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h4>
                    <ul class="type-list">
                     ${pokemonData.types.map(type => `<li class="bg_${type.type.name}">${type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</li>`).join('')}
                    </ul>
                    <div class="btn-container">
                    <button onclick="left(event)" class="btn-left"></button>
                    <button onclick="right(event)" class="btn-right"></button>
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
                    <div class="base-experience">
                    <h5>Base Experience</h5>
                    <p class="p-overlay">${pokemonData.base_experience}</p>
                    </div>
                    <div class="abilities">
                    <h5>Abilities:</h5> 
                    <ul class="pokemon-details">
                     ${pokemonData.abilities.map(ability => ` <li class="p-overlay">${ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}</li>`).join('')}
                    </ul>
                    </div>

                    
                    </div>
                  `;
  overlay.innerHTML = overlayContent;
}

