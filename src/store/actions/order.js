import * as actionType from './actionType';
import axios from '../../axios-orders';

const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionType.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

const purchaseBurgerFail = (error) => {
  return {
    type: actionType.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

const purchaseBurgerStart = () => {
  return {
    type: actionType.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post('/orders.json', orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};
