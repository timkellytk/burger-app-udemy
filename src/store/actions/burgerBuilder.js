import * as actionType from './actionType';
import axios from '../../axios-orders';

export const addIngredient = (ingName) => {
  return {
    type: actionType.ADD_INGREDIENT,
    ingredientName: ingName,
  };
};

export const removeIngredient = (ingName) => {
  return {
    type: actionType.REMOVE_INGREDIENT,
    ingredientName: ingName,
  };
};

const setIngredients = (ingredients) => {
  return {
    type: actionType.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

const fetchIngredientsFailed = () => {
  return {
    type: actionType.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get('https://react-my-burger-fa2bc.firebaseio.com/ingredients.json')
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
