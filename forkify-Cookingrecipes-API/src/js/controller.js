// import from Model
import * as model from './model';

// import from Views
// top view
import searchView from './views/searchView.js';
//lower right view
import recipeView from './views/recipeView.js';
// lower left view
import resultview from './views/resultview.js';
// Bottom left view
import paginationView from './views/paginationView.js';

import 'core-js/stable'; // For old browsers, add more new JS features
import 'regenerator-runtime/runtime'; // For old browsers, support async/awaits

///////////////////////////////////////

// showRecipe function receive 'url' then extract the info

// API RETURN a SINGLE RECIPE with info about:
// 1. Cooking_time,
// 2. id, image_url
// 3. ingredirents
// 4. publisher
// 5. servings
// 6.source_url
// 7. title

// Control Recipe function will retrive the recipe by using the hash provided by the URL
// This receive id -> Load recipe with the corresponding id -> Render recipe
const controlRecipe = async function () {
  try {
    // Get the hash for the URL
    const id = window.location.hash.slice(1);

    if (!id) return;
    // Spinner running before the data is fetched
    recipeView.renderSpinner();

    // I. loading Recipe
    await model.loadRecipe(id);

    // II. Rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

////////////////////////////////////////////
// Listen for the hash change event to change the Recipe

// ['hashchange', 'load'].forEach(ev =>
//   window.addEventListener(ev, controlRecipe),
// );

//////////////////////////////////////////////
// Implement the searching for query

const controlSearchResults = async function () {
  try {
    // Spinner running

    resultview.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results ( this receive arr the render results based on that arr)

    // This receive arr named data the render results based on that arr
    resultview.render(model.getSearchResultPage());

    // 4) Render initial Pagination button
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  // This receive arr named data the render results based on that arr
  resultview.render(model.getSearchResultPage(goToPage));

  // Render initial Pagination button
  paginationView.render(model.state.search);
};

///////////////////////////////////////////

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServing(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);

  recipeView.update(model.state.recipe);
};

///////////////////////////////////////////

const init = function () {
  //lower right view
  recipeView.addHandlerRender(controlRecipe);

  // Top view
  searchView.addHanderSearch(controlSearchResults);

  // Listen for the pagination click
  paginationView.addHanderCick(controlPagination);

  recipeView.addHandlerUpdateServings(controlServings);
};

init();

// const recipeSearch = function (meal) {
//   fetch(`https://forkify-api.jonas.io/api/v2/recipes?search=${meal}`)
//     .then(res => res.json())
//     .then(data => console.log(data));
// };
