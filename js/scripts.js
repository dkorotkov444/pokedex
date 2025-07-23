/* 
JavaScript code for Pokedex
Pokedex is a simple web application for presenting information from Pokemon database.
*/

// Defines list of Pokemons as blank array
let pokemonList = [];
// Define particular Pokemons as objects with 4 keys: 
// name (string), height in meter (number), types (array of strings), abilities (array of strings).
pokemonList = [
    // Define Pikachu
    {   name: 'Pikachu',
        height: 0.40,
        types: ['electric'],
        abilities: ['static', 'lightningrod']
    },
    // Define Raichu
    {   name: 'Raichu',
        height: 0.80,
        types: ['electric'],
        abilities: ['static', 'lightningrod']
    },
    // Define Wartortle
    {   name: 'Wartortle',
        height: 1.00,
        types: ['water'],
        abilities: ['rain-dish', 'torrent']
    },
    // Define Kangaskhan
    {   name: 'Kangaskhan',
        height: 2.20,
        types: ['normal'],
        abilities: ['inner-focus', 'early-bird', 'scrappy']
    },
    // Define Sandshrew
    {   name: 'Sandshrew',
        height: 0.60,
        types: ['ground'],
        abilities: ['sand-veil', 'sand-rush']
    },
    // Define Gloom
    {   name: 'Gloom',
        height: 0.60,
        types: ['grass', 'poison'],
        abilities: ['stench', 'chlorophyll']
    }
];

// Output the list of Pokemons on the homepage using 'for' loop
for (let i = 0; i < pokemonList.length; i++) {          // document.write() is deprecated
    let bigText = pokemonList[i].height > 2?' - Wow, that\'s a big one!':'';    // Ternary 'if'
    document.writeln (`${i+1}. ${pokemonList[i].name} 
        (height: ${pokemonList[i].height};
        types: ${pokemonList[i].types.join(', ')}) ${bigText}<br>`);  // Use 'join' to put space after comma between array elements
}