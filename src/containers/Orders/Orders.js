import React from 'react';
import { withRouter } from 'react-router-dom';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './Orders.module.css';
import Button from '../../components/UI/Button/Button';

const Orders = (props) => {
  props.onFetchOrders(props.token, props.userId);

  const goToBurgerBuilder = () => {
    props.history.push('/');
  };

  let orders = <Spinner />;
  if (!props.loading) {
    orders = (
      <React.Fragment>
        <div className={classes.Orders}>
          <h1>Your Orders</h1>
          <p>
            A list of all the delicious burgers you have ordered with Tim
            Kelly's React app
          </p>
          <Button btnType="Success" clicked={goToBurgerBuilder}>
            Go To Burger Builder
          </Button>
        </div>
        {props.orders.map((order) => (
          <Order
            price={order.price}
            ingredients={order.ingredients}
            key={order.id}
          />
        ))}
      </React.Fragment>
    );
  }
  if (props.orders.length === 0) {
    orders = (
      <div className={classes.Orders}>
        <h1>No orders</h1>
        <p>Please go to the Burger Builder and order a burger</p>
        <Button btnType="Success" clicked={goToBurgerBuilder}>
          Go To Burger Builder
        </Button>
      </div>
    );
  }

  return <div>{orders}</div>;
};

const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actionCreators.fetchOrders(token, userId)),
    onFetchOrdersStart: () => dispatch(actionCreators.fetchOrdersStart()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withErrorHandler(Orders, axios)));
