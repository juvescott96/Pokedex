function fetchPokemonAPI(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=5')
    .then(response => response.json())
    .then(function(allpokemon){
     allpokemon.results.forEach(function(pokemon){
     console.log(pokemon);
     })
    })
 }
