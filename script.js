// Define the $list element and initialize offset
const $list = document.getElementById('list');
let offset = 20; // Initial offset, change as needed
let currentPokemonIndex; // Declare the variable to store the current Pokémon index


// Fetch and display the initial list of Pokémon
async function getPokemons() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const pokedex = await response.json();
    displayPokedex(pokedex.results);
    displayCaughtPokemons();
}


function displayCaughtPokemons() {
    // Get the caught list from local storage or create an empty array
    const caughtList = JSON.parse(localStorage.getItem('caughtList')) || [];

    // Loop through the caught list and update the display
    caughtList.forEach(index => {
        const caughtPokemon = document.querySelector(`.image[data-index='${index}']`);
        if (caughtPokemon) {
            // You can add a specific style or class to indicate that the Pokémon is caught
            caughtPokemon.classList.add('caught-pokemon');
        }
    });

    // Display the modal
    $('#cardModal').modal('show');
}

// Fetch and display more Pokémon on "Load More" button click
async function loadMorePokemons() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
    const pokedex = await response.json();
    displayPokedex(pokedex.results);
    offset += 20; // Increment the offset for the next batch

    // Save the updated offset to local storage
    localStorage.setItem('offset', offset);
}

// Display the list of Pokémon
function displayPokedex(pokemons) {
    let html = [];
    for (const pokemon of pokemons) {
        const index = parseUrl(pokemon.url);

        html.push(`
        <div class="col mb-4">
            <div class="card">
                <div class="card-color">
                    <div class="card-img">
                        <!-- Removed the button and added a click event -->
                        <img class="image" data-index='${index}' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png" class="img-fluid card-img" alt="${pokemon.name}">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">#${index}</h5>
                        <p class="card-text">${pokemon.name}</p>
                    </div>
                </div>
            </div>
        </div>
        `);
    }
        $list.innerHTML += html.join('');
}

// Open the modal for a specific Pokémon
async function getPokemon(index) {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+index);
    const pokemon = await response.json();
    console.log(pokemon);

    // Dynamically create modal content
    const modalContent = `
    <div class="modal" id="cardModal" tabindex="-1" aria-labelledby="cardModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <header>
                                    <div class="container-fluid">
                                        <nav class="navbar">
                                            <div class="logo-style m-2">
                                                <a class="navbar-brand text-start" href="index.html">
                                                    <img src="images/Pokemon-logo.png" class="img-fluid" alt="logo">
                                                </a>
                                            </div>
                            
                                            <div class="close-button-container m-2">
                                                <button class="close-button" onclick="closeModal('cardModal')">
                                                    <i class="bi bi-x"></i> Close
                                                </button>
                                            </div>
                                        </nav>
                                    </div>
                                </header>
                            
                                <main>
                                    <div class="container">
                                        <div class="code-number">
                                            <h1>#${index}</h1>
                                        </div>
                                        
                                        <div class="pokemon-details">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="pokemon-name">
                                                        <h2>${pokemon.name}</h2>
                                                    </div>
                                                
                                                    <div class="pokemon-character">
                                                        <table class="table table-bordered">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="fw-bold">Height</td>
                                                                    <td>${pokemon.height/10} m</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="fw-bold">Weight</td>
                                                                    <td>${pokemon.weight/10} kg</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="fw-bold">Ability</td>
                                                                    <td>${pokemon.abilities[0].ability.name}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                            
                                                <div class="col-md-12 text-center">
                                                    <div class="rounded-circle background-circle bg-white">
                                                        <div class="pokemon-img">
                                                            <img class="image" data-index='${index}'src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png" class="img-fluid" alt="${pokemon.name}">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                            
                                        <div class="pokemon-stat">
                                            <!-- Base Stats heading -->
                                            <div class="row">
                                                <div class="col-md-2 d-flex align-items-center">
                                                    <div class="base-stat-title">
                                                        <h3 class="mb-3">Base Stats</h3>
                                                    </div>
                                                </div>
                                    
                                                <!-- Base Stats List -->
                                                <div class="col-md-10 justify-content-center">      
                                                    <ul class="list-group">
                                                        <!-- HP -->
                                                        <li class="list-group-item">
                                                            <div class="row">
                                                                <div class="col-md-3">
                                                                    <h4>Hp</h4>
                                                                </div>
                                                                <div class="col-md-7">
                                                                    <div class="stat-bar">
                                                                        <div class="progress" style="width: 100%;">
                                                                            <div class="progress-bar bg-success" style="width: ${pokemon.stats[0].base_stat}%;"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-2">
                                                                    <span class="stat-level">${pokemon.stats[0].base_stat}</span>
                                                                </div>
                                                            </div>
                                                        </li>
                            
                                                        <!-- Attrack -->
                                                        <li class="list-group-item">
                                                            <div class="row">
                                                                <div class="col-md-3">
                                                                    <h4>Attack</h4>
                                                                </div>
                                                                <div class="col-md-7">
                                                                    <div class="stat-bar">
                                                                        <div class="progress" style="width: 100%;">
                                                                            <div class="progress-bar bg-success" style="width: ${pokemon.stats[1].base_stat}%;"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-2">
                                                                    <span class="stat-level">${pokemon.stats[1].base_stat}</span>
                                                                </div>
                                                            </div>
                                                        </li>
                            
                                                        <!-- Defense -->
                                                        <li class="list-group-item">
                                                        <div class="row">
                                                            <div class="col-md-3">
                                                                <h4>Defense</h4>
                                                            </div>
                                                            <div class="col-md-7">
                                                                <div class="stat-bar">
                                                                    <div class="progress" style="width: 100%;">
                                                                        <div class="progress-bar bg-success" style="width: ${pokemon.stats[2].base_stat}%;"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-2">
                                                                <span class="stat-level">${pokemon.stats[2].base_stat}</span>
                                                            </div>
                                                        </div>
                                                        </li>
                            
                                                        <!-- Special Attack -->
                                                        <li class="list-group-item">
                                                        <div class="row">
                                                            <div class="col-md-3">
                                                                <h4>Special Attack</h4>
                                                            </div>
                                                            <div class="col-md-7">
                                                                <div class="stat-bar">
                                                                    <div class="progress" style="width: 100%;">
                                                                        <div class="progress-bar bg-success" style="width: ${pokemon.stats[3].base_stat}%;"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-2">
                                                                <span class="stat-level">${pokemon.stats[3].base_stat}</span>
                                                            </div>
                                                        </div>
                                                        </li>
                            
                                                        <!-- Special Defense -->
                                                        <li class="list-group-item">
                                                        <div class="row">
                                                            <div class="col-md-3">
                                                                <h4>Special Defense</h4>
                                                            </div>
                                                            <div class="col-md-7">
                                                                <div class="stat-bar">
                                                                    <div class="progress" style="width: 100%;">
                                                                        <div class="progress-bar bg-success" style="width: ${pokemon.stats[4].base_stat}%;"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-2">
                                                                <span class="stat-level">${pokemon.stats[4].base_stat}</span>
                                                            </div>
                                                        </div>
                                                        </li>
                            
                                                        <!-- Speed -->
                                                        <li class="list-group-item">
                                                        <div class="row">
                                                            <div class="col-md-3">
                                                                <h4>Speed</h4>
                                                            </div>
                                                            <div class="col-md-7">
                                                                <div class="stat-bar">
                                                                    <div class="progress" style="width: 100%;">
                                                                        <div class="progress-bar bg-success" style="width: ${pokemon.stats[5].base_stat}%;"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-2">
                                                                <span class="stat-level">${pokemon.stats[5].base_stat}</span>
                                                            </div>
                                                        </div>
                                                        </li>
                                                    </ul>
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <section class="text-center">
                                        <div class="button-caught">
                                            <button id="catchPokemonBtn" class="btn btn-success">Catch Pokémon</button>
                                            <button id="markCaughtBtn" class="btn btn-primary" style="display: none;">Caught!</button>
                                            <button id="releasePokemonBtn" class="btn btn-danger" style="display: none;">Release</button>
                                            <p id="catchStatus"></p>
                                        </div>
                                    </section>
                                </main>
                            </div>
                        </div>
                    </div>`;

    // Append the modal content to the body
    document.body.insertAdjacentHTML('beforeend', modalContent);

    // Get the modal element
    const modal = document.getElementById('cardModal');

    // Clear catch status and hide buttons
    document.getElementById('catchStatus').innerText = '';
    toggleButtonsVisibility(index);

    // Get references to the buttons and catch status element
    const catchPokemonBtn = document.getElementById('catchPokemonBtn');
    const markCaughtBtn = document.getElementById('markCaughtBtn');
    const releaseButton = document.getElementById('releasePokemonBtn');

    document.getElementById('catchPokemonBtn').addEventListener('click', function () {
        markPokemonAsCaught(index, pokemon);
        toggleButtonsVisibility(index);
    });

    document.getElementById('markCaughtBtn').addEventListener('click', function () {
        // No need to repeat the action, as marking caught is the same
        toggleButtonsVisibility(index);
    });

    document.getElementById('releasePokemonBtn').addEventListener('click', function () {
        releasePokemon(index, pokemon);
        toggleButtonsVisibility(index);
    });

    // Show the modal
    modal.style.display = 'block';
}

function isPokemonCaught(index) {
    // Get the caught list from local storage or create an empty array
    const caughtList = JSON.parse(localStorage.getItem('caughtList')) || [];
    // Check if the Pokémon is in the caught list
    return caughtList.includes(index);
}

function toggleButtonsVisibility(index) {
    const catchButton = document.getElementById('catchPokemonBtn');
    const caughtButton = document.getElementById('markCaughtBtn');
    const releaseButton = document.getElementById('releasePokemonBtn');

    const isCaught = isPokemonCaught(index);

    catchButton.style.display = isCaught ? 'none' : 'inline-block';
    caughtButton.style.display = isCaught ? 'inline-block' : 'none';
    releaseButton.style.display = isCaught ? 'inline-block' : 'none';
}


function releasePokemon(index, pokemon) {
    markPokemonAsCaught(index, pokemon);

    // Hide the "Release" button and display the "Catch Pokémon" button
    const catchButton = document.getElementById('catchPokemonBtn');
    const caughtButton = document.getElementById('markCaughtBtn');
    const releaseButton = document.getElementById('releasePokemonBtn');

    catchButton.style.display = 'inline-block';
    caughtButton.style.display = 'none';
    releaseButton.style.display = 'none';
}


function markPokemonAsCaught(index, pokemon) {
    // Get the caught list from local storage or create an empty array
    let caughtList = JSON.parse(localStorage.getItem('caughtList')) || [];

    // Check if the Pokémon is already in the caught list
    const isCaught = caughtList.includes(index);

    if (isCaught) {
        // If already caught, remove it from the caught list (release)
        caughtList = caughtList.filter(item => item !== index);
    } else {
        // If not caught, add it to the list
        caughtList.push(index);
    }

    // Save the updated caught list to local storage
    localStorage.setItem('caughtList', JSON.stringify(caughtList));

    // Update the catch status message
    document.getElementById('catchStatus').innerText = isCaught ? `You released ${pokemon.name} (#${index})!` : `You caught ${pokemon.name} (#${index})!`;

    // Toggle visibility of the buttons
    toggleButtonsVisibility(!isCaught);
}

// Event listener for card clicks using event delegation
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('image')) {
        const index = e.target.getAttribute('data-index');
        getPokemon(index);
    }
});

// Event listener for "Load More" button click
document.getElementById('loadMoreBtn').addEventListener('click', function() {
    loadMorePokemons();
});

// Function to close the modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        // Remove the modal from the body after closing
        modal.parentNode.removeChild(modal);
    } else {
        console.error(`Modal with ID ${modalId} not found`);
    }
}

// Event listener for the back button inside the modal
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('close-button')) {
        closeModal('cardModal');
    }
});

// Function to extract the Pokémon ID from the URL
function parseUrl(url) {
    return url.substring(url.substring(0, url.length - 2).lastIndexOf('/') + 1, url.length - 1);
}

// Event listener for page load
window.addEventListener('load', function () {
    getPokemons();
});