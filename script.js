const container = document.getElementById("root");
const cards = document.createElement("div");
const header = document.createElement("h3");

cards.classList.add("card-container");
container.appendChild(header);
header.classList.add("header");
header.textContent = "RiCk aNd mOrtY";

container.appendChild(cards);

const getData = async function () {
  const characters = await fetch(
    "https://rickandmortyapi.com/api/character?limit=100",
  ).then((res) => {
    return res.json();
  });

  console.log({ characters });

  displayCharacters(characters);
};

function displayCharacters(characters) {
  characters.results.forEach((charecter) => {
    const innerDiv = document.createElement("div");
    const nameHeading = document.createElement("h3");
    const image = document.createElement("img");
    const gender = document.createElement("p");
    const name = charecter.name;
    const id = charecter.id;
    const button = document.createElement("button");
    button.classList.add("viewmore", `charecter-${id}`);
    const species = document.createElement("p");
    const location = document.createElement("p");

    innerDiv.classList.add("innerDiv");

    image.src = charecter.image;
    [gender, species, location].forEach((item) =>
      item.classList.add("elements", `charecter-${id}`),
    );

    gender.textContent = " Gender: " + charecter.gender;
    location.textContent = " Location: " + charecter.location.name;
    species.textContent = " Species: " + charecter.species;
    button.textContent = "View More";

    nameHeading.textContent = name;

    [image, nameHeading, gender, location, species, button].forEach((item) =>
      innerDiv.appendChild(item),
    );

    cards.appendChild(innerDiv);
  });

  const toggleButton = function () {
    const viewMoreButtons = document.querySelectorAll(".viewmore");

    viewMoreButtons.forEach((button) => {
      button.addEventListener("click", function (event) {
        const elementsToDisplayClassName = event.target.classList[1];
        const elements = document.querySelectorAll(
          `.elements.${elementsToDisplayClassName}`,
        );

        if (elements.length > 0) {
          elements.forEach((element) => {
            if (element.style.display === "block") {
              element.style.display = "none";
              event.target.textContent = "View More";
              return;
            }
            element.style.display = "block";
            event.target.textContent = "Hide Content";
          });
        }
      });
    });
  };
  toggleButton();
}

let currentPage = 1;

function pagination() {
  const paginationDiv = document.createElement("div");
  paginationDiv.classList.add("navDiv");

  // if(id <= 5){

  // }

  const previousButton = document.createElement("button");
  previousButton.classList.add("previousButton");
  previousButton.textContent = "<<<";

  previousButton.addEventListener("click", () =>
    console.log("previous button clicked"),
  );

  const nextButton = document.createElement("button");
  nextButton.classList.add("nextButton");
  nextButton.textContent = ">>>";
  nextButton.addEventListener("click", () =>
    console.log("next button clicked"),
  );

  paginationDiv.appendChild(previousButton);
  paginationDiv.appendChild(nextButton);

  document.body.appendChild(paginationDiv);
}

pagination();
getData();
