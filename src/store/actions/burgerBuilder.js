import * as actionType from './actionType';

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

export const setIngredients = (ingredients) => {
  return {
    type: actionType.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionType.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return {
    type: actionType.INIT_INGREDIENTS,
  };
};
