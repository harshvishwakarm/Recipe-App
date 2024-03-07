const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");

const fetchRecipe = async (query) => {
  recipeContainer.innerHTML = "<h2>fetching recipes..</h2>";
  try {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const response = await data.json();
    recipeContainer.innerHTML = "";
    response.meals.forEach((meal) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");
      recipeDiv.innerHTML = `<img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>`;

      const button = document.createElement("button");
      button.textContent = "View Recipe";
      recipeContainer.appendChild(recipeDiv);
      recipeDiv.appendChild(button);

      button.addEventListener("click", () => {
        openRecipePopUp(meal);
      });
    });
  } catch (error) {
    recipeContainer.innerHTML = "<h2>Error in fetching recipe..</h2>";
  }
};
const fetchIngredients = (meal) => {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      let measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
};
const openRecipePopUp = (meal) => {
  recipeDetailsContent.innerHTML = `<h2  class="recipeName">${meal.strMeal}</h2>
  <h3>Ingredients:</h3>
  <ul  class="ingredientsList">${fetchIngredients(meal)}</ul>
  <div   class="recipeInstructions">
  <h3>Instructions:</h3>
  <p>${meal.strInstructions}</p>
</div>
`;
  recipeDetailsContent.parentElement.style.display = "block";
};
recipeCloseBtn.addEventListener("click", () => {
  recipeDetailsContent.parentElement.style.display = "";
});
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const searchInput = searchBox.value.trim();
  if (!searchInput) {
    recipeContainer.innerHTML = `<h2>type the name of the meal</h2>`;
    return;
  }
  fetchRecipe(searchInput);
  console.log("button clicked!");
});
