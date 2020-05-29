import * as actionType from '../actions/actionType';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true,
      };
    case actionType.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      };
    case actionType.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };
    case actionType.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    default:
      return state;
  }
};

export default orderReducer;
