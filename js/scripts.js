/* 
JavaScript code for Pokedex
Pokedex is a simple web application for presenting information from Pokémon database.
*/

let pokemonRepository = (function(){
    // Defines Pokémon repository and its methods
    // Each Pokémon is an objects with 6 keys: name (string), height in meter (number), types (array of strings), abilities (array of strings),
    //  detailsUrl (string with URL of this Pokémon detail), imageUrl (string with URL of this Pokémon image file).

    let pokemonList = [];   // Define list of Pokémons as a blank array
    const pokemonKeys = ['name','height','types','abilities','detailsUrl', 'imageUrl'];  // Define the set of Pokémon object keys
    const requiredDetailsKeys = ['height','types','abilities','sprites'];                // Object details keys to load from API response
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';  // PokéAPI URL   

    function add(pokemon){
        // Adds one Pokémon at the end of the array/list
        if ((typeof(pokemon) !== "object") || (pokemon === null)){   // Check that argument type is object and that it is not empty
            // Display and log error message
            console.error('Only objects can be added to pokemonList!');
            return; // Exit function if type validation failed
        };

        // Check that argument object has correct subset of keys
        let actualKeys = Object.keys(pokemon);                         // Read key set of the function argument
        if(!actualKeys.every(key => pokemonKeys.includes(key))){       // Check if every argument key is in expected keys
            console.error('Invalid Pokémon object: Incorrect keys.');  // Log error message
            return; // Exit function if keys validation failed
        }

        // If all validations succeeded, add Pokémon to the list
        pokemonList.push(pokemon);
    };
    
    function getAll(){
    // Retrieves complete pokemonList array
        return pokemonList;
    }

    function showLoadingMessage() {
    // Displays data upload message on the homepage
        const loadingMessage = document.querySelector('.loading-message');
        loadingMessage.classList.remove('hidden');
    }

    function hideLoadingMessage() {
    // Displays data upload message on the homepage
        const loadingMessage = document.querySelector('.loading-message');
        loadingMessage.classList.add('hidden');
    }

    function getOne(nameCalled){
        // Retrieves one pokemon with specified name, assumes no duplicates in the list for simplicity
        // Filter pokemonList by name down to array of 1 object, empty if no match found
        let pokemonCalled = pokemonList.filter((pokemon) => pokemon.name === nameCalled);
        const foundPokemon= pokemonCalled[0];   // Assign to object first array element, undefined if empty
        return foundPokemon;   // Return an object with specified name if found, undefined otherwise
    }

    function loadList() {
        // Loads list of Pokémons from PokéAPI
        showLoadingMessage();
        return fetch(apiUrl)
            // Parse fetched data
            .then(response => response.json())
            .then(json => {
                console.log('Start loading');
                // Loop over parsed objects
                json.results.forEach(item => {  
                    let capitalizedName = item.name.charAt(0).toUpperCase() + item.name.slice(1);
                    let pokemon = {
                        name: capitalizedName,
                        detailsUrl: item.url
                    };
                    // Call function that adds new Pokemon object to repository
                    add(pokemon);
                });
                setTimeout(hideLoadingMessage, 1000);  //Show loading message for 1 second minimum, then hide
        }).catch(function (err) {   // Handle errors
            hideLoadingMessage();
            console.error(err);
        })
    }

    function loadDetails(item) {
        // Loads details for a particular Pokémon
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(response => response.json()) // Parse JSON data
            .then(details => {
                // Validate if all required Pokémon details (keys) are present in the API response
                let actualKeys = Object.keys(details);
                if (!requiredDetailsKeys.every(key => actualKeys.includes(key))){
                    // Handle the case when the API response lacks required data
                    console.error('API response is missing required Pokémon details.');
                    return; // Stop execution if validation fails
                }
                // Add the details to the item if validation successful
                item.imageUrl = details.sprites.front_default;
                item.height = details.height / 10;      // PokéAPI stores height in decimeters, we store in meters                        
                item.types = details.types.map(type => type.type.name);      // Store array of type names only, not whole objects
                item.abilities = details.abilities.map(ability => ability.ability.name);    // Store array of abilitiy names only, not whole objects
                setTimeout(hideLoadingMessage, 1000);  //Show loading message for 1 second minimum, then hide
                return item         // Function returns parameter updated with details
        }).catch(function (err) {   // Handle errors
            hideLoadingMessage();
            console.error(err);
        });
    }

    function addListItem(pokemon, container){
    // Add one list item with Pokémon button to the list container
        let listItem = document.createElement('li');    // Create list item
        let button = document.createElement('button');  //Create button
        button.classList.add('button__pokemon');
        button.innerText = pokemon.name;
        // Add event listener to created button, watching out for click
        button.addEventListener('click',function () {
            showDetails(pokemon)
        });
        // Append list item with button to the list
        listItem.appendChild(button);
        container.appendChild(listItem);
    }

    function showDetails (pokemon) {
    // Displays Pokemon details
        loadDetails(pokemon).then(function(){
        console.log(`${pokemon.name} called up.`);   // TEST
        });
    }

    return {
        add: add,                   // undefined
        getAll: getAll,             // returns compele list of Pokémons
        getOne: getOne,             // returns one Pokémon with specified name or undefined
        addListItem: addListItem,   // undefined
        showDetails: showDetails,   // undefined
        loadList: loadList,         // undefined  
        loadDetails: loadDetails    // undefined
    }
})();   // End of IIFE pokemonrepository

/*
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
*/

// Define container element where to attach a list of Pokémons, only once
let pokemonRoster = document.querySelector('.pokemon-list');

// Initialize Pokémon repository from Pokemon API call
pokemonRepository.loadList().then(function () {
    if (!pokemonRoster) {
        console.error('Pokémon list container not found.');  // Log error message
        return; // Terminate display function
    }   
    // Output the list of Pokémons on the homepage using forEach() loop
    pokemonRepository.getAll().forEach (function(pokemon) {
        pokemonRepository.addListItem(pokemon, pokemonRoster);
    }) 
}).catch(function (err) {
                // Handle errors
                console.error(err);
});

/*
// Find one Pokémon by the name entered by user (must come after Pokémon list is created)
let wanted = prompt('Find Pokémon called: ');
let wantedPokemon = pokemonRepository.getOne(wanted);
if (wantedPokemon) { // Check if a Pokémon was actually found
    document.writeln(`<br>Found: ${wantedPokemon.name} (height: ${wantedPokemon.height}; types: ${wantedPokemon.types.join(', ')})<br>`);
} else {
    document.writeln(`<br>Pokémon ${wanted} not found.<br>`);
}
*/
