import { getMealsByQueryText, getMealsByIdOrRandom } from "./api-calls.js";
import { getSingleMealEl, getForEachMealElement } from "./html-content.js";
const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");

window.getMealById = getMealById;

random.addEventListener("click", getRandomMeal);

function getRandomMeal() {
  getMealsByIdOrRandom().then((meal) => displaySingleMeal(meal));
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";
}

function displaySingleMeal(singleMeal) {
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
  const singleMealDom = getSingleMealEl(singleMeal, stringIngredients);
  single_mealEl.innerHTML += singleMealDom;
}

function searchMeal(e) {
  e.preventDefault();

  const queryString = search.value.trim();

  if (queryString) {
    getMealsByQueryText(queryString).then((meals) =>
      addMealsToDom(meals, queryString)
    );
    single_mealEl.innerHTML = "";
  } else {
  }
}
submit.addEventListener("submit", searchMeal);

function addMealsToDom(meals, queryStr) {
  mealsEl.innerHTML = "";
  single_mealEl.innerHTML = "";
  if (meals === null) {
    resultHeading.innerHTML = `<h2>There are no search results. Try again!</h2>`;
  } else {
    resultHeading.innerHTML = `<h2>Search results for ${queryStr}</h2>`;

    meals.forEach((meal) => {
      const eachMeal = getForEachMealElement(meal);

      mealsEl.innerHTML += eachMeal;
    });
  }
  search.value = "";
}

function getMealById(id) {
  getMealsByIdOrRandom(id).then((meal) => displaySingleMeal(meal));
}
