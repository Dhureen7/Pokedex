async function pokemonPage(poke_search) {
    const pokemonName = document.getElementById('pokemon-name');
    const pokemonHWIC = document.getElementById('hwi-cries');
    const pokeShiny = document.getElementById('sprites');
    const pokemon = await getPokemon(poke_search);
    if(pokemon) {
        let pokemon_name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        document.title = `${pokemon_name}`;
        pokemon_name = pokemon_name.toUpperCase();
        let type = pokemon.types[0].type.name.toUpperCase();
        pokemonName.innerHTML = `<div class="display-image">
                                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" style="max-height: 100%;">
                                </div>
                                <div class="poke-name">
                                    <p style="text-align: center;">${pokemon_name}</p>
                                </div>
                                <div class="poke-type">
                                    <p style="text-align: center;">TYPE: ${type}</p>
                                </div>
                                `
        const height = pokemon.height*10;
        const weight = pokemon.weight/10;
        pokemonHWIC.innerHTML = `<div class="l-item height-weight" id="pokehwi">
                                    <div class="hw id">
                                        <p>ID: ${pokemon.id}</p>
                                    </div>
                                    <div class="hw height">
                                        <img src="resources/height-icon.png" alt="height-icon" style="height: 50%;">
                                        <p>${height} cm</p>
                                    </div>
                                    <div class="hw weight">
                                        <img src="resources/weight-icon.png" alt="weight-icon" style="height: 50%;">
                                        <p>${weight} kg</p>
                                    </div>
                                </div>
                                <div class="l-item cries">
                                    <div class="aud">
                                        <audio controls id="audioPlayer">
                                            <source src="${pokemon.cries.latest}" type="audio/ogg">
                                            Your browser does not support the audio element.
                                        </audio>
                                    </div>
                                </div>
                                `

        pokeShiny.innerHTML =   `<div class="spr front">   
                                    <p>SHINY ${pokemon_name} FRONT</p>
                                    <img src="${pokemon.sprites.front_shiny}" alt="shiny ${pokemon.name} front" style="min-height: 150px">
                                </div>
                                <div class="spr back">   
                                    <p>SHINY ${pokemon_name} BACK</p>
                                    <img src="${pokemon.sprites.back_shiny}" alt="shiny ${pokemon.name} back" style="min-height: 150px">
                                </div>
                                `

        const xArray = [pokemon.stats[4].base_stat, pokemon.stats[3].base_stat, pokemon.stats[5].base_stat, pokemon.stats[2].base_stat, pokemon.stats[1].base_stat, pokemon.stats[0].base_stat];
        const yArray = [" SP. DEF"," SP. ATT"," SPEED"," DEF"," ATT"," HP"];
        const data = [{
            x: xArray,
            y: yArray,
            type: "bar",
            orientation: "h",
            marker: {color:"rgba(255,0,0,0.6)"}, 
            text: xArray, // Adding labels to the bars
            textfont: {
                color: 'black', // Set the color of the labels
            },
            textposition: 'auto' // Positioning the labels
        }];
        
        const layout = {
            title:"STATS", 
            width: 400,  // Adjust the width as needed
            height: 300, // Adjust the height as needed
            margin: {
                l: 20,   // Adjust the left margin as needed
                r: 80,   // Adjust the right margin as needed
                t: 50,   // Adjust the top margin as needed
                b: 50    // Adjust the bottom margin as needed}; 
                },
            plot_bgcolor: "rgba(250,235,215,0)", // Background color of the plot area
            paper_bgcolor: "rgba(250,235,215,0)", // Background color of the paper
            xaxis: {
                autorange: 'reversed' // Reverse the direction of the x-axis
            },
            yaxis: {
                side: 'right'
            }
            }
        
        const config = {
            displayModeBar: false, 
            staticPlot: true // Disable all interactive features
        };

        Plotly.newPlot("graph", data, layout, config);
    } else {
        pokemonName.innerHTML = "<div style='margin: 10px; color: yellow'><p>Error 404 Pokemon not found. Try again!</p></div>"
    }
}

function getRandomNumberBetween(x, y) {
    return Math.floor(Math.random() * (y - x + 1)) + x;
}

async function randomPokemon() {
    const numberOfPokemon = 1025;
    const poke_id = getRandomNumberBetween(1, numberOfPokemon);
    pokemonPage(poke_id);
}

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

window.onload = function() {
    var searchInput = getQueryParam('search');
    if(searchInput) {
        pokemonPage(searchInput);
    } else {
        randomPokemon();
    }
}