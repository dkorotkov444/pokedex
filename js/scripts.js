/* 
JavaScript code for Pokedex
Pokedex is a simple web application for presenting information from Pokemon database.
*/

// Define Pokemon repository
let pokemonRepository = (function(){
    // Defines list of Pokemons as blank array
    let pokemonList = [];    
    // Adds one pokemon et the end of the array/list
    function add(pokemon){
            pokemonList.push(pokemon);
    };
    // Retrieves complete pokemonList array
    function getAll(){
        return pokemonList;
    }
    // Retrieves one pokemon with specified name
    //function getOne(){
    //    return pokemon;
    // }
   
    return {
        add: add,
        getAll: getAll //,
    //    getOne: getOne
    }
})();

// Define particular Pokemons as objects with 4 keys: 
// name (string), height in meter (number), types (array of strings), abilities (array of strings).

// Define Pikachu
pikachu =
    {   name: 'Pikachu',
        height: 0.40,
        types: ['electric'],
        abilities: ['static', 'lightningrod']
    };
// Define Raichu
raichu =
    {   name: 'Raichu',
        height: 0.80,
        types: ['electric'],
        abilities: ['static', 'lightningrod']
    };
// Define Wartortle
wartortle =
    {   name: 'Wartortle',
        height: 1.00,
        types: ['water'],
        abilities: ['rain-dish', 'torrent']
    };
// Define Kangaskhan
kangaskhan =
    {   name: 'Kangaskhan',
        height: 2.20,
        types: ['normal'],
        abilities: ['inner-focus', 'early-bird', 'scrappy']
    };
// Define Sandshrew
sandshrew =
    {   name: 'Sandshrew',
        height: 0.60,
        types: ['ground'],
        abilities: ['sand-veil', 'sand-rush']
    };
// Define Gloom
gloom =
    {   name: 'Gloom',
        height: 0.60,
        types: ['grass', 'poison'],
        abilities: ['stench', 'chlorophyll']
    };

// Add pokemons to list
pokemonRepository.add(pikachu);
pokemonRepository.add(kangaskhan);
pokemonRepository.add(gloom);
pokemonRepository.add(raichu);
pokemonRepository.add(wartortle);
pokemonRepository.add(sandshrew);

// Output the list of Pokemons on the homepage using forEach() loop
pokemonRepository.getAll().forEach (function(pokemon, i) {
    let bigText = pokemon.height > 2?' - Wow, that\'s a big one!':'';   // Ternary 'if'
    document.writeln (`${i+1}. ${pokemon.name} 
        (height: ${pokemon.height}; 
        types: ${pokemon.types.join(', ')}) ${bigText}<br>`);  // Use 'join' to put space after comma between array elements    
});