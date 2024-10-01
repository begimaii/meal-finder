const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");

// Get a random meal
const randomUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
// Search a meal by id, i.e. i=53031
const searchUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
// Search a meal by string input, i.e. s=egg
const searchByQueryStrUrl =
  "https://www.themealdb.com/api/json/v1/1/search.php?s=";

random.addEventListener("click", getRandomMeal);
let randomMeal = [];

function fetchRandomData() {
  fetch(randomUrl)
    .then((res) => res.json())
    .then((data) => {
      randomMeal = data.meals[0];
      displaySingleMeal(randomMeal);
    })
    .catch((err) => console.log(err));
}
function getRandomMeal() {
  fetchRandomData();
  // displaySingleMeal(searchMeal);
  resultHeading.innerHTML = "";
  mealsEl.innerHTML = "";
}

function displaySingleMeal(singleMeal) {
  single_mealEl.innerHTML = "";

  const { strMeal, strMealThumb, strCategory, strArea, strInstructions } =
    singleMeal;

  const ingredients = [];
  for (let i = 0; i < 20; i++) {
    if (singleMeal["strIngredient" + i]) {
      const singleIngr = `<li>${singleMeal["strIngredient" + i]} - ${
        singleMeal["strMeasure" + i]
      }</li>`;
      ingredients.push(singleIngr);
    }
  }
  const stringIngredients = ingredients.join("");
  const singleEl = `<div class="single-meal">
          <h1>${strMeal}</h1>
          <img
            src="${strMealThumb}"
            alt="${strMeal}"
          />
          <div class="single-meal-info">
            <p>${strCategory}</p>
            <p>${strArea}</p>
          </div>
          <div class="main">
            <p>${strInstructions} </p>
            <h2>Ingredients</h2>
            <ul>
          ${stringIngredients}
            </ul>
          </div>
        </div>`;
  single_mealEl.innerHTML += singleEl;
}

function searchMeal(e) {
  e.preventDefault();

  const queryString = search.value.trim();

  if (queryString) {
    fetch(searchByQueryStrUrl + queryString)
      .then((res) => res.json())
      .then((data) => {
        addMealsToDom(data.meals, queryString);
        displaySingleMeal(null);
      })
      .catch((err) => console.log(err));
  } else {
  }
}
submit.addEventListener("submit", searchMeal);

function addMealsToDom(meals, queryStr) {
  mealsEl.innerHTML = "";
  if (meals === null) {
    resultHeading.innerHTML = `<h2>There are no search results. Try again!</h2>`;
  } else {
    resultHeading.innerHTML = `<h2>Search results for ${queryStr}</h2>`;

    meals.forEach((meal) => {
      const { strMealThumb, strMeal, idMeal } = meal;
      const eachMeal = `<div class="meal">
      <img
        src="${strMealThumb}"
        alt="${strMeal}"
      />
      <div onclick = "getMealById(${idMeal})" class="meal-info">
        <h3>${strMeal}</h3>
      </div>
    </div>`;
      mealsEl.innerHTML += eachMeal;
    });
  }
  search.value = "";
}

function getMealById(id) {
  fetch(searchUrl + id)
    .then((res) => res.json())
    .then((data) => {
      const meals = data.meals[0];
      displaySingleMeal(meals);
    })
    .catch((err) => console.log(err));
}
