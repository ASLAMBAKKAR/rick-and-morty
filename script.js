const container = document.getElementById("root");
const cards = document.createElement("div");
cards.classList.add("card-container");


    

container.appendChild(cards);


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

let currentPage = 1;

function pagination() {
    const paginationDiv = document.createElement("div");
paginationDiv.classList.add("navDiv");

const previousButton = document.createElement("button");
previousButton.classList.add("previousButton");
previousButton.textContent = "<<<";
previousButton.addEventListener("click", () => console.log("previous button clicked"));


const nextButton = document.createElement("button");
nextButton.classList.add("nextButton");
nextButton.textContent = ">>>";
nextButton.addEventListener("click", () => console.log("next button clicked"));

paginationDiv.appendChild(previousButton);
paginationDiv.appendChild(nextButton);

document.body.appendChild(paginationDiv);


}
  
pagination()
getData();

// Create a div for each character and append it to the container, show name and image of each character
