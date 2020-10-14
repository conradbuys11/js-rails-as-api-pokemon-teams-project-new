const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let main;

document.addEventListener('DOMContentLoaded', () => {
    main = document.querySelector('main');
    fetch(TRAINERS_URL)
    .then(data => data.json())
    .then(trainers => trainers.forEach(createTrainerCard)) //remember to set up rails
    document.addEventListener('click', onPageClick)
})

function onPageClick(e){
    if(e.target.classList.contains('add')){
        //add a pokemon to this trainer
        let trainer_id = e.target.parentNode.id.split('-')[1]
        console.log(trainer_id)
        fetch(`${TRAINERS_URL}/${trainer_id}`)
        .then(data => data.json())
        .then(createPokemon)
    }
    else if(e.target.classList.contains('release')){
        deletePokemon(e.target.parentNode)
    }
}

function createTrainerCard(trainer){
    let trainerDiv = document.createElement('div');
    trainerDiv.classList.add('card')
    trainerDiv.id = `trainer-${trainer.id}`
    main.appendChild(trainerDiv)
    //console.log(trainerDiv)

    let trainerName = document.createElement('p')
    trainerName.innerText = trainer.name
    trainerDiv.appendChild(trainerName)

    let addButton = document.createElement('button')
    addButton.classList.add('add')
    addButton.innerText = 'Add Pokemon'
    trainerDiv.appendChild(addButton)

    let pokemonList = document.createElement('ul')
    trainerDiv.appendChild(pokemonList)

    trainer.pokemons.forEach(addPokemonToTrainerCard)
}

function addPokemonToTrainerCard(pokemon){
    //debugger
    let pokemonList = document.querySelector(`div#trainer-${pokemon.trainer_id} ul`)

    listItem = document.createElement('li')
    listItem.id = `pokemon-${pokemon.id}`
    listItem.innerText = `${pokemon.nickname}  (${pokemon.species})`
    pokemonList.appendChild(listItem)
    releaseButton = document.createElement('button')
    releaseButton.classList.add('release')
    releaseButton.innerText = 'Release'
    listItem.appendChild(releaseButton)
}

function createPokemon(trainer){
    //does this trainer have 6 pokemon?
    //if so, don't do anything
    //if not, let's add a pokemon!
    debugger
    if(trainer.pokemons.length < 6){
        // let pokemonData = {trainer_id: trainer.id}
        //sending the create page
        //our pokemon's trainer

        let package = {}
        package.method = 'POST'
        package.headers = {'Content-Type': 'application/json'}
        //need to do
        package.body = JSON.stringify({trainer_id: trainer.id})
        //if we put the body having JUST trainer_id, will it be cool?

        fetch(POKEMONS_URL, package)
        .then(data => data.json())
        .then(addPokemonToTrainerCard)
    }
}

function deletePokemon(pokemonNode){
    let pokemon_id = pokemonNode.id.split('-')[1]

    fetch(`${POKEMONS_URL}/${pokemon_id}`, {method: 'DELETE'})
    .then(data => data.json())
    .then(() => {
        pokemonNode.remove();
    })
}

