const cardsPerPage = 20;
let currentPage = 1;

const generations = {
    gen1: { start: 1, end: 151 },
    gen2: { start: 152, end: 251 },
    gen3: { start: 252, end: 386 },
    gen4: { start: 387, end: 493 },
    gen5: { start: 494, end: 649 },
    gen6: { start: 650, end: 721 },
    gen7: { start: 722, end: 809 },
    gen8: { start: 810, end: 905 },
    gen9: { start: 906, end: 1025 }
};

let currentGeneration = generations.gen1; // Default

function getCurrentPage() {
    const pageNumber = document.getElementById('current-page');
    pageNumber.innerHTML = `${currentPage}`;
}

function displayPokemon(pokemon) {
    if (!pokemon) {
        return `<div>Error getting pokemon</div>`;
    }
    let pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    return `
        <div style="height: 200px; width: 20%" class="pokemon-container">
            <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
            <p style="text-align: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <a href="pokemon_info.html?search=${pokemon.name}" class="poke-link">
                    ${pokemonName}
                </a>
            </p>
        </div>
    `;
}

async function getPokemon(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        return null;
    }
}

async function loadPokemonCards() {
    const container = document.getElementById('c');
    container.innerHTML = '';

    const startID = (currentPage - 1) * cardsPerPage + currentGeneration.start;
    const endID = Math.min(startID + cardsPerPage - 1, currentGeneration.end);
    const pokemonPromises = [];

    for (let id = startID; id <= endID; id++) {
        pokemonPromises.push(getPokemon(id));
    }

    const pokemonData = await Promise.all(pokemonPromises);

    pokemonData.forEach((pokemon) => {
        const cardHTML = displayPokemon(pokemon);
        container.innerHTML += cardHTML;
    });

    document.getElementById('prev-button').disabled = currentPage === 1;
    document.getElementById('next-button').disabled = endID >= currentGeneration.end;
}

function nextPage() {
    const maxPages = Math.ceil((currentGeneration.end - currentGeneration.start + 1) / cardsPerPage);
    if (currentPage < maxPages) {
        currentPage++;
        loadPokemonCards();
        getCurrentPage();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        loadPokemonCards();
        getCurrentPage();
    }
}

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const generationParam = urlParams.get('generation');

    if (generationParam && generations.hasOwnProperty(generationParam)) {
        changeGeneration(generationParam);
    }
};

function changeGeneration(gen, applyStyles = true) {
    Object.keys(generations).forEach(key => {
        document.getElementById(`${key}-link`).style.color = '';
        document.getElementById(`${key}-link`).style.fontWeight = '';
    });

    if(applyStyles) {
        currentGeneration = generations[gen];
        document.getElementById(`${gen}-link`).style.color = 'red';
        document.getElementById(`${gen}-link`).style.fontWeight = 'bold';
    }

    currentPage = 1;
    loadPokemonCards();
    getCurrentPage();
}