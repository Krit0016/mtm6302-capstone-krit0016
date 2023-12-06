async function getPokemons() {

    const response = await fetch('https://pokeapi.co/api/v2/pokemon')
    const pokedex = await response.json()
    console.log(pokedex)
    displayPokedex(pokedex.results)
 }
 getPokemons()

 const $list = document.getElementById('list')
 
 function displayPokedex(pokemons) {
    let html = []; // Declare html outside the loop
    for (const pokemon of pokemons) {
        const index = parseUrl(pokemon.url);
        html.push(`
        <div class="col mb-4">
            <div class="card">
                <div class="g-card">
                    <div class="card-img">
                        <!-- Removed the button and added a click event -->
                        <img class="image" data-index='${index}' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png" class="img-fluid card-img" alt="${pokemon.name}" onclick="openModal(${index})">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title-g">#${index}</h5>
                        <p class="card-text">${pokemon.name}</p>
                    </div>
                </div>
            </div>
        </div>
        `)
    }
$list.innerHTML = html.join('')


// Add click event listener to each Pokemon card
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function (e) {
        e.preventDefault();
        const selectedIndex = this.getAttribute('data-index');
        getPokemon(selectedIndex);
    });
});
}

function openModal(index) {
    const modalId = `pokemonModal${index}`;
    const modal = document.getElementById('cardModal');

    if (modal) {
        modal.style.display = 'block';
    } else {
        console.error(`Modal with ID ${modalId} not found`);
    }
}



// parseURL
// Will return the pokemon's id from the provided url
function parseUrl (url) {
    return url.substring(url.substring(0, url.length - 2).lastIndexOf('/') + 1, url.length - 1)
}

async function getPokemon(index) {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+index);
    const pokemon = await response.json();
    console.log(pokemon);
    const stats = pokemon.stats;

    const html = `
    <div class="modal fade" id="cardModal" tabindex="-1" aria-labelledby="cardModalLabel" aria-hidden="true">
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
                            
                            <div class="back-button-container m-2">
                                <button class="back-button" onclick="closeModal('cardModal')">
                                    <i class="bi bi-arrow-left"></i> Back
                                </button>
                            </div>
                        </nav>
                    </div>
                </header>
                <div class="container-fluid">
                    <button class="back-btn btn btn-primary">Back</button>
                    <div class="code-number">
                        <h1>#${index}</h1>
                    </div>
            
                    <div class="pokemon-details">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="pokemon-name">
                                    <h2>${pokemon.name}</h2>
                                </div>

                                <div class="pokemon-type">
                                    <img src="images/grass.png" class="img-fluid" alt="Grass">
                                    <span class="type">Grass & Poison</span>
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

                            <div class="col-md-6">
                            <div class="rounded-circle background-circle"></div>
                                <div class="pokemon-img">
                                    <img class="image" data-index='${index}'src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png" class="img-fluid" alt="${pokemon.name}">
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
                                                        <div class="progress-bar bg-success" style="width: 45%;">${pokemon.stats[0].base_stat}</div>
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
                                                        <div class="progress-bar bg-success" style="width: 49%;">${pokemon.stats[1].base_stat}</div>
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
                                                    <div class="progress-bar bg-success" style="width: 49%;">${pokemon.stats[2].base_stat}</div>
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
                                                    <div class="progress-bar bg-success" style="width: 65%;">${pokemon.stats[3].base_stat}</div>
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
                                                    <div class="progress-bar bg-success" style="width: 65%;">${pokemon.stats[4].base_stat}</div>
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
                                                    <div class="progress-bar bg-success" style="width: 45%;">${pokemon.stats[5].base_stat}</div>
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
        </div>
    </div>`;
    
    $list.innerHTML = html;
}

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('back-button')) {
        // Handle back button click
        closeModal('cardModal');
        getPokemons();
    }
});

document.body.insertAdjacentHTML('beforeend', html);

$list.addEventListener('click', function(e){
    e.preventDefault()
    console.log(e.target)
    if (
        e.target.classList.contains('image') 
    ){
        console.log(e.target.dataset.index)
        getPokemon(e.target.dataset.index)
        $list.innerHTML = `
        <div class="modal fade" id="cardModal" tabindex="-1" aria-labelledby="cardModalLabel" aria-hidden="true">
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
                            
                            <div class="back-button-container m-2">
                                <button class="back-button" onclick="closeModal('cardModal')">
                                    <i class="bi bi-arrow-left"></i> Back
                                </button>
                            </div>
                        </nav>
                    </div>
                </header>
                <div class="container-fluid">
                    <button class="back-btn btn btn-primary">Back</button>
                    <div class="code-number">
                        <h1>#${index}</h1>
                    </div>
            
                    <div class="pokemon-details">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="pokemon-name">
                                    <h2>${pokemon.name}</h2>
                                </div>

                                <div class="pokemon-type">
                                    <img src="images/grass.png" class="img-fluid" alt="Grass">
                                    <span class="type">Grass & Poison</span>
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

                            <div class="col-md-6">
                            <div class="rounded-circle background-circle"></div>
                                <div class="pokemon-img">
                                    <img class="image" data-index='${index}'src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png" class="img-fluid" alt="${pokemon.name}">
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
                                                        <div class="progress-bar bg-success" style="width: 45%;">${pokemon.stats[0].base_stat}</div>
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
                                                        <div class="progress-bar bg-success" style="width: 49%;">${pokemon.stats[1].base_stat}</div>
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
                                                    <div class="progress-bar bg-success" style="width: 49%;">${pokemon.stats[2].base_stat}</div>
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
                                                    <div class="progress-bar bg-success" style="width: 65%;">${pokemon.stats[3].base_stat}</div>
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
                                                    <div class="progress-bar bg-success" style="width: 65%;">${pokemon.stats[4].base_stat}</div>
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
                                                    <div class="progress-bar bg-success" style="width: 45%;">${pokemon.stats[5].base_stat}</div>
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
        </div>
    </div>`
    }

})

