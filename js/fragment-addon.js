let pokemonRepository = (function() {
    let pokemonList = [];

    // ... (Your existing add, getAll, getOne functions)

    // A private helper function to create a single list item
    function addListItem(pokemon) {
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.classList.add('button__pokemon');
        button.innerText = pokemon.name;
        listItem.appendChild(button);
        return listItem; // It now returns the created element
    }

    // A new public function that orchestrates the entire rendering process
    function renderPokemonList(containerSelector) {
        let container = document.querySelector(containerSelector);
        let fragment = document.createDocumentFragment();

        pokemonList.forEach(function(pokemon) {
            let listItem = addListItem(pokemon); // Call the private helper
            fragment.appendChild(listItem);
        });

        container.appendChild(fragment); // Append the fragment in one go
    }

    return {
        add: add,
        getAll: getAll,
        getOne: getOne,
        renderPokemonList: renderPokemonList // Expose the new render function
    };
})();

// Add pokemons to repository
for (let i = 0; i < pokemonEntry.length; i++) {
  pokemonRepository.add(pokemonEntry[i]);
}

// Render the entire list with a single function call
pokemonRepository.renderPokemonList('.pokemon-list');