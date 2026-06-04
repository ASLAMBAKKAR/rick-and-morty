const container = document.getElementById("root");
const head = document.createElement("div");
const cards = document.createElement("div");
const header = document.createElement("h3");
const searchContainer = document.createElement("div");
const search = document.createElement("input");
const parentDiv = document.createElement("div");
const resultContainer = document.createElement("div");

resultContainer.classList.add("result-container");
head.classList.add("head");
container.appendChild(head);
search.classList.add("searchBar");
search.placeholder = "⌕";
searchContainer.classList.add("searchdiv");
cards.classList.add("card-container");
head.appendChild(header);
header.classList.add("header");
header.textContent = "RiCk aNd mOrtY";
head.appendChild(searchContainer);
searchContainer.appendChild(search);
parentDiv.appendChild(cards);
container.appendChild(resultContainer);
container.appendChild(parentDiv);
parentDiv.classList.add("parentdiv");

let currentPage = 1;
let totalPage = 42;
let pageIndicator;

const getData = async function () {
  cards.innerHTML = "";

  const currentPageNum = document.getElementById("currentPageNum");
  if (currentPageNum) currentPageNum.textContent = currentPage;

  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${currentPage}`
    );
    const data = await response.json();

    const limitedResults = data.results.slice(0,15);
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
      innerDiv.appendChild(item)
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
      const clickedCard = event.target.closest(".innerDiv");
      const allCards = document.querySelectorAll(".innerDiv");
      const isOpen = clickedCard.classList.contains("active-card");

      if (isOpen) {
        elements.forEach((el) => (el.style.display = "none"));
        event.target.textContent = "View More";
        event.target.classList.remove("open");
        event.target.classList.remove("close-btn");
        clickedCard.classList.remove("active-card");
        allCards.forEach((card) => card.classList.remove("blurred-card"));
      } else {
        elements.forEach((el) => (el.style.display = "block"));
        event.target.textContent = "×";
        event.target.classList.add("open");
        event.target.classList.add("close-btn");
        clickedCard.classList.add("active-card");
        allCards.forEach((card) => {
          if (card !== clickedCard) {
            card.classList.add("blurred-card");
          }
        });
      }
    };
  });
}

function searCharacters() {
  const input = document.querySelector("input");
  let timeout;

  input.addEventListener("input", (event) => {
    const query = event.target.value.trim();

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fetchData(query);
    }, 300);
  });

  async function fetchData(query) {
    cards.innerHTML = "";

    if (!query) {
      getData();
      return;
    }
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${query}`
      );
      if (!response.ok) {
        throw new Error("Character not found!!!");
      }
      const data = await response.json();
      displayCharacters(data.results);
    } catch (error) {
      cards.innerHTML = `<h1 style="color:#d9ac1a; font-family:'Creepster',fantasy; text-align:justify;">No characters found</h1>`;
      console.error(error);
    }
  }
}

searCharacters();


function updateButtonStates(previousButton, nextButton) {
  if (currentPage === 1) {
    previousButton.classList.add("disabled");
    previousButton.setAttribute("aria-disabled", "true");
  } else {
    previousButton.classList.remove("disabled");
    previousButton.removeAttribute("aria-disabled");
  }

  if (currentPage === totalPage) {
    nextButton.classList.add("disabled");
    nextButton.setAttribute("aria-disabled", "true");
  } else {
    nextButton.classList.remove("disabled");
    nextButton.removeAttribute("aria-disabled");
  }
}

function pagination() {
  const paginationDiv = document.createElement("div");
  paginationDiv.classList.add("navDiv");

  const previousButton = document.createElement("button");
  previousButton.classList.add("previousButton");
  previousButton.innerHTML = `&#8592; Previous`;

  pageIndicator = document.createElement("div");
  pageIndicator.classList.add("page-indicator");
  pageIndicator.innerHTML = `
    <span class="label">Page</span>
    <span class="current" id="currentPageNum">${currentPage}</span>
    <span class="separator">/</span>
    <span class="total">${totalPage}</span>
  `;

  const nextButton = document.createElement("button");
  nextButton.classList.add("nextButton");
  nextButton.innerHTML = `Next &#8594;`;

  updateButtonStates(previousButton, nextButton);

  previousButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      getData();
      updateButtonStates(previousButton, nextButton);
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPage < totalPage) {
      currentPage++;
      getData();
      updateButtonStates(previousButton, nextButton);
    }
  });
  function handleKeyDown(event) {
  if (event.key === "ArrowRight") {
    if (currentPage < totalPage) {
      currentPage++;
      getData();
      updateButtonStates(previousButton, nextButton);
    }
  }
  if (event.key === "ArrowLeft") {
    if (currentPage > 1) {
      currentPage--;
      getData();
      updateButtonStates(previousButton, nextButton);
    }
  }
}

window.addEventListener("keydown", handleKeyDown);

  paginationDiv.appendChild(previousButton);
  paginationDiv.appendChild(pageIndicator);
  paginationDiv.appendChild(nextButton);
  document.body.appendChild(paginationDiv);
}


pagination();
getData();