const container = document.getElementById("root");
const cards = document.createElement("div");
cards.classList.add("card-container");
let page = 1;
const charactersPerPage = 10;

container.appendChild(cards);

// create a function to fetch the data from the API and display it on the console.
// fetch('https://rickandmortyapi.com/api/character')
// when data printing completes,

// let sample = [1, 2, 3, 4, 5, 6]

const getData = async function () {
  const characters = await fetch(
    "https://rickandmortyapi.com/api/character?limit=100",
  ).then((res) => {
    return res.json();
  });

  displayCharacters(characters);
};

function displayCharacters(characters) {
  characters.results.forEach((character) => {
    const innerDiv = document.createElement("div");
    const nameHeading = document.createElement("h3");
    const image = document.createElement("img");
    const gender = document.createElement("p");
    const name = character.name;
    const button = document.createElement("button");
    button.classList.add("viewmore");
    const species = document.createElement("p");
    const location = document.createElement("p");

    innerDiv.classList.add("innerDiv");

    image.src = character.image;
    [gender, species, location].forEach((item) =>
      item.classList.add("elements"),
    );

    gender.textContent = " Gender: " + character.gender;
    location.textContent = " Location: " + character.location.name;
    species.textContent = " Species: " + character.species;
    button.textContent = "View More";

    nameHeading.textContent = name;
    
    [image, nameHeading, gender, location, species, button].forEach(
      (item) => innerDiv.appendChild(item),
    );
    
    cards.appendChild(innerDiv);
  });

  const toggleButton = function () {
    const viewMoreButtons = document.querySelectorAll(".viewmore");
    viewMoreButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const elements = this.parentElement.querySelectorAll(".elements");
      });
    });
  };
}

getData();

// Create a div for each character and append it to the container, show name and image of each character
