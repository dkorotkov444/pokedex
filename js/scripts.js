/* 
JavaScript code for Pokedex
Pokedex is a simple web application for presenting information from Pokémon database.
*/

let pokemonRepository = (function(){
    // Defines Pokémon repository and its methods
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

        // If all validations succeeded, add Pokémon to the list
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
   
    function addListItem(pokemon, container){
    // Add one list item with Pokemon button to the list container
        // Create list item
        let listItem = document.createElement('li');
        //Create button
        let button = document.createElement('button');
        button.classList.add('button__pokemon');
        button.innerText = pokemon.name;
        // Add event listener to created button, watching out for click
        button.addEventListener('click',function (event) {
            showDetails(pokemon)
        });
        // Append list item with button to the list
        listItem.appendChild(button);
        container.appendChild(listItem);
    }

    function showDetails (pokemon) {
    // Displays Pokemon details
        console.log(pokemon.name);
    }

    return {
        add: add,                   // undefined
        getAll: getAll,             // returns compele list of Pokémons
        getOne: getOne,             // returns one Pokémon with specified name or undefined
        addListItem: addListItem,   // undefined
        showDetails: showDetails    // undefined
    }
})();   // End of IIFE pokemonrepository

// Define particular Pokémons as objects with 4 keys: 
// name (string), height in meter (number), types (array of strings), abilities (array of strings).

// Initialize Pokemon array
let pokemonEntry = [
    {   name: 'Pikachu',
        height: 0.40,
        types: ['electric'],
        abilities: ['static', 'lightningrod'],
    },
    {   name: 'Raichu',
        height: 0.80,
        types: ['electric'],
        abilities: ['static', 'lightningrod']
    },
    {   name: 'Wartortle',
        height: 1.00,
        types: ['water'],
        abilities: ['rain-dish', 'torrent']
    },
    {   name: 'Kangaskhan',
        height: 2.20,
        types: ['normal'],
        abilities: ['inner-focus', 'early-bird', 'scrappy']
    },
    {   name: 'Sandshrew',
        height: 0.60,
        types: ['ground'],
        abilities: ['sand-veil', 'sand-rush']
    },
    {   name: 'Gloom',
        height: 0.60,
        types: ['grass', 'poison'],
        abilities: ['stench', 'chlorophyll']
    }
]

// Add pokemons to repository in a for cycle over pokemonEntry array
for (let i = 0; i < pokemonEntry.length; i++) {
    pokemonRepository.add(pokemonEntry[i]);
}

// Define container element where to attach a list of Pokémons, only once
let pokemonRoster = document.querySelector('.pokemon-list');
// Output the list of Pokémons on the homepage using forEach() loop
if (pokemonRoster) {
    pokemonRepository.getAll().forEach (function(pokemon) {
        pokemonRepository.addListItem(pokemon, pokemonRoster);
    }) 
} else {    // Throw error
    alert('ERROR: Pokémon list container not found');
    console.error('Pokémon list container not found')
};


// Find one Pokémon by the name entered by user (must come after Pokémon list is created)
/*
let wanted = prompt('Find Pokémon called: ');
let wantedPokemon = pokemonRepository.getOne(wanted);
if (wantedPokemon) { // Check if a Pokémon was actually found
    document.writeln(`<br>Found: ${wantedPokemon.name} (height: ${wantedPokemon.height}; types: ${wantedPokemon.types.join(', ')})<br>`);
} else {
    document.writeln(`<br>Pokémon ${wanted} not found.<br>`);
}
*/
