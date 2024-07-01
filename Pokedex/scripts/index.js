async function getPokemon(poke_search) {
    const PokeAPI = `https://pokeapi.co/api/v2/pokemon/${poke_search}/`;
    try {
        const response = await fetch(PokeAPI);
        if(!response.ok) {
            throw new Error('Network response was not okay' + response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error('There was an error fetching the pokemon: ' + error);
        return null;
    }
}

async function searchResult() {
    var inputValue = document.getElementById('searchInput').value;
    console.log("Search input: ", inputValue);
    if(inputValue === "") {
        console.log("The input is empty.");
        return;
    }
    inputValue = inputValue.toLowerCase();
    window.location.href = 'pokemon_info.html?search=' + encodeURIComponent(inputValue);
}