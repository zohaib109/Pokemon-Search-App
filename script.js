// getting the required html elements and storing them in variables
const inputElm = document.getElementById("search-input");
const buttonElm = document.getElementById("search-button");
const nameElm = document.getElementById("pokemon-name");
const idElm = document.getElementById("pokemon-id");
const weightElm = document.getElementById("weight");
const heightElm = document.getElementById("height");
const imageElm = document.getElementById("image");
const typesElm = document.getElementById("types");
const hpElm = document.getElementById("hp");
const attackElm = document.getElementById("attack");
const defenseElm = document.getElementById("defense");
const specialAttackElm = document.getElementById("special-attack");
const specialDefenseElm = document.getElementById("special-defense");
const speedElm = document.getElementById("speed");
const PokeAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

// Adding event listeners
buttonElm.addEventListener("click", () => {
  displayPokemon();
});
inputElm.addEventListener("keyDown", (event) => {
  if (event.key === "Enter") {
    displayPokemon();
  }
});

async function displayPokemon() {
  // getting user input
  const pokemonNameOrId = inputElm.value.toLowerCase();

  // using a function that is getting pokemon data in JSON format using PokeAPI
  const pokemonData = await fetchPokemonData(pokemonNameOrId);

  // Displaying information about the pokemon if entered data was correct
  if (pokemonData) {
    nameElm.textContent = pokemonData.name.toUpperCase();
    idElm.textContent = "#" + pokemonData.id;
    weightElm.textContent = `Weight: ${pokemonData.weight}`;
    heightElm.textContent = `Height: ${pokemonData.height}`;
    imageElm.innerHTML = `<img id="sprite" src="${pokemonData.sprites.front_default}" />`;
    typesElm.innerHTML = "";
    pokemonData.types.forEach((element) => {
      typesElm.innerHTML += `<span class="type">${element.type.name.toUpperCase()}</span>`;
    });

    // filling the stats
    hpElm.textContent = pokemonData.stats[0].base_stat;
    attackElm.textContent = pokemonData.stats[1].base_stat;
    defenseElm.textContent = pokemonData.stats[2].base_stat;
    specialAttackElm.textContent = pokemonData.stats[3].base_stat;
    specialDefenseElm.textContent = pokemonData.stats[4].base_stat;
    speedElm.textContent = pokemonData.stats[5].base_stat;
  } else {
    alert("Pokémon not found");
  }

  inputElm.value = "";
}

// function that returns data in json for a specific pokemon
async function fetchPokemonData(pokemonNameOrId) {
  try {
    const response = await fetch(PokeAPI + `/${pokemonNameOrId}`);
    if (!response.ok) {
      throw new Error("could not fetch resource");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
