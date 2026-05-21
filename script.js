const container = document.getElementById("root");
const cards = document.createElement("div");
const header = document.createElement("h3");

cards.classList.add("card-container");
container.appendChild(header);
header.classList.add("header");
header.textContent = "RiCk aNd mOrtY";
container.appendChild(cards);

let currentPage = 1;

const getData = async function () {
  cards.innerHTML = "";
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${currentPage}`,
    );
    const data = await response.json();

     const limitedResults = data.results.slice(0, 15);

    displayCharacters(limitedResults);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

function displayCharacters(characters) {
  characters.forEach((character) => {
    const innerDiv = document.createElement("div");
    const nameHeading = document.createElement("h3");
    const image = document.createElement("img");
    const gender = document.createElement("p");
    const species = document.createElement("p");
    const location = document.createElement("p");
    const button = document.createElement("button");

    const id = character.id;
    innerDiv.classList.add("innerDiv");

    image.src = character.image;
    button.classList.add("viewmore", `char-${id}`);
    button.textContent = "View More";

    [gender, species, location].forEach((item) => {
      item.classList.add("elements", `char-${id}`);
      item.style.display = "none"; 
    });

    gender.textContent = " Gender: " + character.gender;
    location.textContent = " Location: " + character.location.name;
    species.textContent = " Species: " + character.species;
    nameHeading.textContent = character.name;

    [image, nameHeading, gender, location, species, button].forEach((item) =>
      innerDiv.appendChild(item),
    );

    cards.appendChild(innerDiv);
  });

  setupToggleButtons();
}

function setupToggleButtons() {
  const viewMoreButtons = document.querySelectorAll(".viewmore");

  viewMoreButtons.forEach((button) => {
    button.onclick = function (event) {
      const idClass = event.target.classList[1];
      const elements = document.querySelectorAll(`.elements.${idClass}`);

      elements.forEach((element) => {
        if (element.style.display === "block") {
          element.style.display = "none";
          event.target.textContent = "View More";
        } else {
          element.style.display = "block";
          event.target.textContent = "Hide Content";
        }
      });
    };
  });
}

function pagination() {
  const paginationDiv = document.createElement("div");
  paginationDiv.classList.add("navDiv");

  const previousButton = document.createElement("button");
  previousButton.classList.add("previousButton");
  previousButton.textContent = " <<< PREVIOUS  ";

  const nextButton = document.createElement("button");
  nextButton.classList.add("nextButton");
  nextButton.textContent = "NEXT >>> ";

  previousButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      getData();
    }
  });

  nextButton.addEventListener("click", () => {
    currentPage++;
    getData();
  });

  paginationDiv.appendChild(previousButton);
  paginationDiv.appendChild(nextButton);
  document.body.appendChild(paginationDiv);
}
pagination();
getData();
