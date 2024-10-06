export const getSingleMealEl = (singleMeal, stringIngredients) => {
  const { strMeal, strMealThumb, strCategory, strArea, strInstructions } =
    singleMeal;
  return `<div class="single-meal">
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
};
export const getForEachMealElement = (meal) => {
  const { strMealThumb, strMeal, idMeal } = meal;
  return `<div class="meal">
      <img
        src="${strMealThumb}"
        alt="${strMeal}"
      />
      <div onclick = "getMealById(${idMeal})" class="meal-info">
        <h3>${strMeal}</h3>
      </div>
    </div>`;
};
