/* 
JavaScript code for Pokedex
Pokedex is a simple web application for presenting information from Pokemon database.
*/

let pokemonRepository = (function(){
    // Defines Pokemon repository and its methods
    // Define list of Pokémons as blank array
    let pokemonList = [];    

    function add(pokemon){
        // Adds one Pokémon at the end of the array/list
        // Check that argument type is object
        if ((typeof(pokemon) !== "object") || (pokemon === null)){
            // Display and log error message
            console.error('Only objects can be added to pokemonList!');
            alert('Only objects can be added to pokemonList!');
            return; // Exit function if type validation failed
        };

        // Check that argument object has correct set of keys
        // Define standard key set for Pokemon
        let pokemonKeys = ['name','height','types','abilities'];
        // Read key set of the function argument
        let actualKeys = Object.keys(pokemon);
        if (actualKeys.length !== pokemonKeys.length ||             // Compare key arrays length
            !actualKeys.every(key => pokemonKeys.includes(key))){   // Check if every argument key is in expected keys
                // Display and log error message
                console.error('Invalid Pokémon object: Missing or incorrect keys.');
                alert('Add object with 4 keys (name, height, types, abilities)');
                return; // Exit function if keys validation failed
        }

        // If all validations succeeded, add pokemon to the list
        pokemonList.push(pokemon);
    };
    
    function getAll(){
    // Retrieves complete pokemonList array
        return pokemonList;
    }

    function getOne(nameCalled){
        // Retrieves one pokemon with specified name, assumes no duplicates in the list for simplicity
        // Filter pokemonList by name down to array of 1 object, empty if no match found
        let pokemonCalled = pokemonList.filter((pokemon) => pokemon.name === nameCalled);
        const foundPokemon= pokemonCalled[0];   // Assign to object first array element, undefined if empty
        return foundPokemon;   // Return an object with specified name if found, undefined otherwise
    }
   
    return {
        add: add,       //  undefined
        getAll: getAll, //  compele list of Pokemons
        getOne: getOne  //  one Pokemon with specified name or undefined
    }
})();   // End of IIFE pokemonrepository

// Define particular Pokemons as objects with 4 keys: 
// name (string), height in meter (number), types (array of strings), abilities (array of strings).

// Define Pikachu
pikachu =
    {   name: 'Pikachu',
        height: 0.40,
        types: ['electric'],
        abilities: ['static', 'lightningrod'],
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

// Find one Pokemon by the name entered by user (must come after Pokemon list is created)
let wanted = prompt('Find Pokémon called: ');
let wantedPokemon = pokemonRepository.getOne(wanted);
if (wantedPokemon) { // Check if a Pokémon was actually found
    document.writeln(`<br>Found: ${wantedPokemon.name} (height: ${wantedPokemon.height}; types: ${wantedPokemon.types.join(', ')})<br>`);
} else {
    document.writeln(`<br>Pokémon ${wanted} not found.<br>`);
}
