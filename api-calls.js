const randomUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
// Search a meal by id, i.e. i=53031
const searchUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
// Search a meal by string input, i.e. s=egg
const searchByQueryStrUrl =
  "https://www.themealdb.com/api/json/v1/1/search.php?s=";

export const getMealsByQueryText = async (queryString) => {
  try {
    // const resp = await fetch(searchByQueryStrUrl + queryString);
    // const data = await resp.json();
    // return data.meals;
    return (await (await fetch(searchByQueryStrUrl + queryString)).json())
      .meals;
  } catch (err) {
    console.log({
      message: "Something went wrong",
      err,
    });
  }
};

export const getMealsByIdOrRandom = async (id) => {
  const requesttUrl = id ? searchUrl + id : randomUrl;
  try {
    const res = await fetch(requesttUrl);
    const data = await res.json();
    return data.meals[0];
  } catch (err) {
    console.log({
      message: "Something went wrong",
      err,
    });
  }
};
