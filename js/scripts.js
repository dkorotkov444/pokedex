/* 
JavaScript code for Pokedex
Pokedex is a simple web application for presenting information from Pokémon database.
*/

let pokemonRepository = (function(){
    // This IIFE function defines Pokémon repository and its methods
    // Each Pokémon is an objects with 6 keys: name (string), height in meter (number), types (array of strings), abilities (array of strings),
    // detailsUrl (string with URL of this Pokémon detail), imageUrl (string with URL of this Pokémon image file).

    // Constants and variables definitions
    let pokemonList = [];   // Define list of Pokémons as a blank array
    const pokemonKeys = ['name','height','types','abilities','detailsUrl', 'imageUrl'];  // Define the set of Pokémon object keys
    const requiredDetailsKeys = ['height','types','abilities','sprites'];                // Object details keys to load from API response
    const pokeapiUrl = 'https://pokeapi.co/api/v2/pokemon/';  // PokéAPI URL   
    const pokemonCount = 150;       // Number of Pokémons to be loaded over PokeAPI 
    const pageSize = 15;            // Number of Pokémons displayed per page
    let currentOffset = 0;          // This variable's state is maintained by the closure

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
    // Hides data upload message from the homepage
        const loadingMessage = document.querySelector('.loading-message');
        loadingMessage.classList.add('hidden');
    }

    function getOne(nameCalled){
        // Retrieves one Pokémon with specified name, assumes no duplicates in the list for simplicity
        // Filter pokemonList by name down to array of 1 object, empty if no match found
        let pokemonCalled = pokemonList.filter((pokemon) => pokemon.name === nameCalled);
        const foundPokemon= pokemonCalled[0];   // Assign to object first array element, undefined if empty
        return foundPokemon;   // Return an object with specified name if found, undefined otherwise
    }

    function loadPage(offset) {
        // Loads one page of Pokémons from PokéAPI
        showLoadingMessage();   // Show data loading message
        let limit = pageSize
        // Check if the current offset plus the page size will exceed the total Pokémon count to display
        if (offset + pageSize > pokemonCount) {
            // If it does, calculate the remaining number of Pokémons to fetch
            limit = pokemonCount - offset;
        }
        let pageUrl = `${pokeapiUrl}?limit=${limit}&offset=${offset}`;  // PokéAPI URL for one page of Pokémons
        // Clear the existing list before loading the new page
        pokemonList = [];

        return fetch(pageUrl)
            // Parse fetched data
            .then(response => response.json())
            .then(json => {
                // Loop over parsed objects
                json.results.forEach(item => {  
                    let capitalizedName = item.name.charAt(0).toUpperCase() + item.name.slice(1);
                    let pokemon = {
                        name: capitalizedName,
                        detailsUrl: item.url
                    };
                    // Call function that adds new Pokémon object to repository
                    add(pokemon);
                });
                hideLoadingMessage();  //Show data loading message for 1 second minimum, then hide
                return pokemonList; // Return the loaded list (one page long)
        }).catch(function (err) {   // Handle errors
            hideLoadingMessage();   // Hide loading message immediately
            console.error(err);
        })
    }

    function loadDetails(item) {
        // Loads details for a particular Pokémon
        showLoadingMessage();   // Show data loading message
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
                hideLoadingMessage();  //Show data loading message for 1 second minimum, then hide
                return item         // Function returns parameter updated with details
        }).catch(function (err) {   // Handle errors
            hideLoadingMessage();   // Hide loading message immediately
            console.error(err);
        });
    }

    function addListItem(pokemon){
    // Add one list item with Pokémon button to the list container
        const listItem = document.createElement('li');    // Create list item element
        const button = document.createElement('button');  //Create button element
        // Add Bootstrap CSS classes
        listItem.classList.add('list-group-item')
        button.classList.add('btn', 'btn-primary', 'w-100');

        button.textContent = pokemon.name;

        // Tie the button to pokemonModal
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#pokemonModal');

        // Add event listener to created button, watching out for click
        button.addEventListener('click', () => {
            showDetails(pokemon)
        });
        // Append list item with button to the list
        listItem.appendChild(button);
        return listItem;
    }

    function showDetails (pokemon) {
    // Displays Pokémon details
        loadDetails(pokemon).then(() => {
        const modalTitle = document.querySelector('.modal-title');
        const modalBody = document.querySelector('.modal-body');

        // Clear modal content
        modalTitle.textContent = '';
        modalBody.innerHTML = '';

        // Compose modal title
        modalTitle.textContent = `${pokemon.name} details`;

        // Compose modal body
        // Add Pokémon image    
        const pokemonImage = document.createElement('img');
        pokemonImage.src = pokemon.imageUrl;
        pokemonImage.alt = `${pokemon.name} default image`;
        // Add Pokémon details text
        const pokemonDetails = document.createElement('p');
        pokemonDetails.innerText = 
            `Height: ${pokemon.height}
             Types: ${pokemon.types.join(', ')}
             Abilities: ${pokemon.abilities.join(', ')}`;

        modalBody.appendChild(pokemonImage);
        modalBody.appendChild(pokemonDetails);

        });
    }

    // Public pokemonRepository methods
    return {
        add: add,                   // undefined
        getAll: getAll,             // returns compele list of Pokémons
        getOne: getOne,             // returns one Pokémon with specified name or undefined
        addListItem: addListItem,   // listItem element
        showDetails: showDetails,   // undefined
        loadPage: loadPage,         // undefined
        loadDetails: loadDetails,   // undefined
        getCurrentOffset: () => currentOffset, // Public method to get offset
        getPageSize: () => pageSize, // Public method to get page size
        getPokemonCount: () => pokemonCount, // Public method to get total Pokémon count
        setCurrentOffset: (newOffset) => { currentOffset = newOffset; }, // Public method to set offset
    }
})();   // End of IIFE pokemonRepository

//  ************    MAIN PROGRAM    ************

const pokemonRoster = document.querySelector('#pokemonList');  // Define container element where to attach a list of Pokémons, only once
const nextButton = document.querySelector('.next-button');    // Define button calling next Pokémon list page
const prevButton = document.querySelector('.prev-button');    // Define button calling previous Pokémon list page

// Function rendering a Pokémon list page
function renderPage(offset) {
    pokemonRepository.loadPage(offset).then(() => {
        if (!pokemonRoster) {
            console.error('Pokémon list container not found.');
            return; // Terminate display function
        }
        pokemonRoster.innerHTML = '';   // Clear the list
        pokemonRepository.getAll().forEach(pokemon => {
            const listItem = pokemonRepository.addListItem(pokemon);    // Store list item returned by addListItem function
            pokemonRoster.appendChild(listItem);
        });
        // If we are on the first page, hide "Previous page" button
        prevButton.classList.toggle('hidden', offset === 0)
        // If we are on the last page, hide "Next page" button
        nextButton.classList.toggle('hidden', offset + pokemonRepository.getPageSize() >= pokemonRepository.getPokemonCount());
    })
    .catch(function (err) {
            console.error(err);
    });
}

// Initial page load
renderPage(0);

// Event listeners for pagination buttons
nextButton.addEventListener('click', () => {
    // Get pagination parameters
    const currentOffset = pokemonRepository.getCurrentOffset();
    const pageSize = pokemonRepository.getPageSize();
    const numberOfPokemons = pokemonRepository.getPokemonCount();
    // Update parameters and render page only if there is a next page
    if (currentOffset + pageSize < numberOfPokemons) {
        let newOffset = currentOffset + pageSize;
        pokemonRepository.setCurrentOffset(newOffset);
        renderPage(newOffset);
    }
});

prevButton.addEventListener('click', () => {
    // Get pagination parameters
    const currentOffset = pokemonRepository.getCurrentOffset();
    const pageSize = pokemonRepository.getPageSize();
    // Update parameters and render page
    if (currentOffset > 0) {
        const newOffset = currentOffset - pageSize;
        pokemonRepository.setCurrentOffset(newOffset);
        renderPage(newOffset);
    }
});


/*  NOT RELEVANT FOR THE TIME BEING
// Find one Pokémon by the name entered by user (must come after Pokémon list is created)
let wanted = prompt('Find Pokémon called: ');
let wantedPokemon = pokemonRepository.getOne(wanted);
if (wantedPokemon) { // Check if a Pokémon was actually found
    document.writeln(`<br>Found: ${wantedPokemon.name} (height: ${wantedPokemon.height}; types: ${wantedPokemon.types.join(', ')})<br>`);
} else {
    document.writeln(`<br>Pokémon ${wanted} not found.<br>`);
}
*/
