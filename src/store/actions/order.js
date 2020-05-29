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
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionType.PURCHASE_INIT,
  };
};

const fetchedOrdersSuccess = (orders) => {
  return {
    type: actionType.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

const fetchOrdersFail = (error) => {
  return {
    type: actionType.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrders = () => {
  return (dispatch) => {
    axios
      .get('/orders.json')
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        dispatch(fetchedOrdersSuccess(fetchedOrders));
      })
      .catch((err) => {
        dispatch(fetchOrdersFail(err));
      });
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionType.FETCH_ORDERS_START,
  };
};
