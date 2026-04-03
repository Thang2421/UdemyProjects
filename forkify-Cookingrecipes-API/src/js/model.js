import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './views/helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    // 1. Fetch the data using URL

    // 2. Check if the response if ok?
    // 2.ok!_ If the response is not ok retune immediately and throw new err

    const data = await getJSON(`${API_URL}/${id}`);

    // 2.ok_ If the response is ok
    // new Const *recipe* is loaded _ Object:recipe

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      cookingTime: recipe.cooking_time,
      image: recipe.image_url,
      publisher: recipe.publisher,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
    };
  } catch (err) {
    console.error(`${err} from model.js`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    // This func takes URL and retrieve data
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        image: rec.image_url,
        publisher: rec.publisher,
        title: rec.title,
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// This func export the arr that corresponding to the page number
export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;

  let start = (page - 1) * state.search.resultPerPage;
  let end = start + state.search.resultPerPage;

  return state.search.results.slice(start, end);
};

export const updateServing = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    // console.log(ing.quantity);
    ing.quantity = (newServings * ing.quantity) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};
