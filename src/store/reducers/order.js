import * as actionType from '../actions/actionType';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseBurgerSucess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId,
  };
  return updateObject(state, {
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true,
  });
};

const purchaseBurgerFail = (state) => {
  return updateObject(state, { loading: false });
};

const purchaseBurgerStart = (state) => {
  return updateObject(state, { loading: true });
};

const purchaseInit = (state) => {
  return updateObject(state, { purchased: false });
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, { orders: action.orders, loading: false });
};

const fetchOrdersFail = (state) => {
  return updateObject(state, { loading: false });
};

const fetchOrdersStart = (state) => {
  return updateObject(state, { loading: true });
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSucess(state, action);
    case actionType.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state);
    case actionType.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state);
    case actionType.PURCHASE_INIT:
      return purchaseInit(state);
    case actionType.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionType.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state);
    case actionType.FETCH_ORDERS_START:
      return fetchOrdersStart(state);
    default:
      return state;
  }
};

export default orderReducer;
