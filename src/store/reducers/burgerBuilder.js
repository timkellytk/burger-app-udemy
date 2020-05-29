import * as actionTypes from '../actions/actionType';

const initialState = {
  ingredients: null,
  totalPrice: 5,
  error: false,
};

const INGREDIENT_PRICES = {
  meat: 2,
  cheese: 1,
  bacon: 1,
  salad: 0.5,
};

const burgerBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]:
            state.ingredients[action.ingredientName] + -1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          meat: action.ingredients.meat,
          cheese: action.ingredients.cheese,
        },
        totalPrice: 5,
        error: false,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default burgerBuilderReducer;
