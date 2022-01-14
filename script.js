"use strict";

const user1 = {
  id: "giorgio cignitti",
  pin: 1111,
  solutions: ["NaCl", "NaCl-lowBapta", "A-Gluc"],
  drugs: ["apyrase", "ttx"],
};

const user2 = {
  id: "ana janjusevic",
  pin: 2222,
  solutions: ["K-Gluc", "Na-Glucs"],
  drugs: ["DAP5", "NBQX"],
};

const users = [user1, user2];

///////////////////////////////////////////////////////
const btnLogIn = document.querySelector(".login__btn");
const inputLoginId = document.querySelector(".login__input--id");
const inputLoginPin = document.querySelector(".login__input--pin");
const btnAddNewSolution = document.querySelector(".btn__solution");
const container = document.querySelector(".app");
const containerSolutions = document.querySelector(".container__solution");
const containerDrugs = document.querySelector(".container__drugs");
const navText = document.querySelector(".nav__text");
const inputSolutionText = document.querySelector(".newSolutionText");
const inputDrugText = document.querySelector(".newDrugText");
const btnAddNewDrug = document.querySelector(".btn__addDrug");
const btnSelectDrug = document.querySelector(".btn__selectDrug");
const btnRemoveDrug = document.querySelector(".btn__removeDrug");

let currentUser;

const createUsername = function (users) {
  users.forEach(function (us) {
    us.username = us.id
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUsername(users);

const displaySolutions = function (solutions) {
  containerSolutions.innerHTML = "";
  solutions.forEach(function (sol, i) {
    const html = `<li> ${sol} </li>`;
    containerSolutions.insertAdjacentHTML("afterbegin", html);
  });
};

const displayDrugs = function (drugs) {
  containerDrugs.innerHTML = "";
  drugs.forEach(function (drg) {
    const html = `<li> ${drg} </li>`;
    containerDrugs.insertAdjacentHTML("afterbegin", html);
  });
};

const updateNavText = function (user) {
  navText.textContent = `Welcome ${user}`;
};

///
btnLogIn.addEventListener("click", function (e) {
  e.preventDefault();
  currentUser = users.find((us) => us.username === inputLoginId.value);
  if (currentUser?.pin === Number(inputLoginPin.value)) {
    container.classList.remove("hidden");
    //display solutions
    displaySolutions(currentUser.solutions);
    //display drugs
    displayDrugs(currentUser.drugs);
    //update nav text
    updateNavText(currentUser.id);
  }
});

//add new solution
btnAddNewSolution.addEventListener("click", function (e) {
  e.preventDefault();
  const newSolution = inputSolutionText.value;
  currentUser.solutions.push(newSolution);
  const html = `<li> ${currentUser.solutions.at(-1)} </li>`;
  containerSolutions.insertAdjacentHTML("beforeend", html);
  inputSolutionText.value = "";
});

btnAddNewDrug.addEventListener("click", function (e) {
  e.preventDefault();
  const newDrug = inputDrugText.value;
  currentUser.drugs.push(newDrug);
  const html = `<li> ${currentUser.drugs.at(-1)} </li>`;
  containerDrugs.insertAdjacentHTML("beforeend", html);
  inputDrugText.value = "";
});

//removing drugs
btnRemoveDrug.addEventListener("click", function (e) {
  e.preventDefault();
  const index = currentUser.drugs.indexOf(inputDrugText.value);
  if (index !== -1) {
    currentUser.drugs.splice(index, 1);
  }
  displayDrugs(currentUser.drugs);
  inputDrugText.value = "";
});
