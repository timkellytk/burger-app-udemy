import * as actionTypes from './action';

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 5,
  purchasable: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {};
    case actionTypes.REMOVE_INGREDIENT:
      return {};
    default:
      return state;
  }
};

export default reducer;
