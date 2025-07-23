/* 
JavaScript code for Pokedex
Pokedex is a simple web application for presenting information from Pokemon database.
*/

// Defines list of Pokemons as blank array
let pokemonList = [];
// Define particular Pokemons as objects with 4 keys. name, height, types, abilities.
pokemonList = [
    // Define Pikachu
    {   name: 'Pikachu',
        height: 40,
        types: ['electric'],
        abilities: ['static', 'lightningrod']
    },
    // Define Raichu
    {   name: 'Raichu',
        height: 80,
        types: ['electric'],
        abilities: ['static', 'lightningrod']
    },
    // Define Wartortle
    {   name: 'Wartortle',
        height: 100,
        types: ['water'],
        abilities: ['rain-dish', 'torrent']
    },
    // Define Kangaskhan
    {   name: 'Kangaskhan',
        height: 220,
        types: ['normal'],
        abilities: ['inner-focus', 'early-bird', 'scrappy']
    },
    // Define Sandshrew
    {   name: 'Sandshrew',
        height: 60,
        types: ['ground'],
        abilities: ['sand-veil', 'sand-rush']
    },
    // Define Gloom
    {   name: 'Gloom',
        height: 60,
        types: ['grass', 'poison'],
        abilities: ['stench', 'chlorophyll']
    }
];

