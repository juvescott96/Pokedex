

function renderPokemonList(pokemonArray) {
  let allPokemonContainer = document.getElementById('pokemon-card');
  allPokemonContainer.innerHTML = '';

  pokemonArray.forEach((pokemonData) => {
    
    
    const trueIndex = allPokemonData.findIndex(p => p.id === pokemonData.id);
    let content = `
                    <div onclick="toggleOverlay(${trueIndex})" class="content-pokemon">
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
                    <div class="tab-menu">
                    <p onclick="showAbout(${index})" id="tab-about">About</p>
                    <p onclick="showStats(${index})" id="tab-stats">Stats</p>
                    <p onclick="showEvolution(${index})" id="tab-evolution">Evolution</p>
                    </div>
                    <div id="tab-content"></div>
                    <div class="btn-container">
                    <button onclick="left(event)" class="btn-left"></button>
                    <button onclick="right(event)" class="btn-right"></button>
                    </div>
                  `;
  overlay.innerHTML = overlayContent;

  showAbout(index);
}

function showAbout(index) {
  let pokemonData = allPokemonData[index];
  let container = document.getElementById("tab-content");
  container.innerHTML = `
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
        ${pokemonData.abilities.map(ability => `<li class="p-overlay">${ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}</li>`).join('')}
      </ul>
    </div>
  `;
}

function showStats(index) {
  let pokemonData = allPokemonData[index];
  let container = document.getElementById("tab-content");
  container.innerHTML = `
    <div class="stats">
      <h5>Base Stats</h5>
      <ul class="ul-stats">
        ${pokemonData.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
      </ul>
    </div>
  `;
}

function showEvolution(index) {
  let pokemonData = allPokemonData[index];
  let container = document.getElementById("tab-content");
  container.innerHTML = `
    <div class="evolution-chain">
      <h5>Evolution Chain</h5>
      <div class="evolution-items">
        ${pokemonData.evolution.map((evo, i) => `
          <div class="evolution-item">
            <img src="${evo.sprite}" alt="${evo.name}">
            <div class="evo-name">${evo.name.charAt(0).toUpperCase() + evo.name.slice(1)}</div>
          </div>
           ${i < pokemonData.evolution.length - 1 ? '<div style="font-size: 12px;">→</div>' : ''}
        `).join('')}
      </div>
    </div>
  `;
}

