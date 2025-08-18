# pokedex
Git repository for Pokedex web app
Pokedex is a web app that retrieves and displays information on Pokémons

# Project objective
To build a small web application with HTML, CSS, and JavaScript that loads
data from an external API and enables the viewing of data points in detail.

# Features and Requirements
## User Goals
Your users should be able to view a list of data and see more details for a given data item on demand.
It’s up to you to come up with a type of data you want to display (see this list of public APIs for an
example); however, if you don’t have any special preferences, you can write a small Pokédex app to
display a list of Pokémon.
## Key Features
● Load data from an external source (API)
● View a list of items
● On user action (e.g., by clicking on a list item), view details for that item
## Technical Requirements
### Required:
● The app must load data from the Pokémon API.
● The app must display a list of Pokémons loaded from that API after the page is loaded.
● The app must enable the viewing of more details for a given Pokémon on
demand, i.e. when clicking on a list item.
● The app must have CSS styling.
● The JavaScript code must be formatted according to ESLint rules.
    ○ The JavaScript code may be formatted via Prettier.
    ○ The JavaScript code may be manually formatted.
● The app must use at least one additional complex UI pattern, such as a modal, for details or
touch interactions.
● The app must not throw any errors when being used.
● The app should be deployed to a publicly accessible platform like GitHub Pages.
● The app must work in Chrome, Firefox, Safari, Edge, and Internet Explorer 11.
### Nice to Have:
● The app should show loading indicators while loading data.
● The app should handle errors (such as trying to load data while offline) and show user-friendly
error messages.

# Techniques applied
## Libraries
● Bootstrap UI
● Promis polyfill
● Fetch polyfill
## Performance
JavaScript code was minified using Toptal JavaScript Minifier
## UI elements used
● List group
● Modal
● Navigation bar
● Pagination