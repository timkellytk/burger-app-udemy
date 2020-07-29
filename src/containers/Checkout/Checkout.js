import React from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

const Checkout = (props) => {
  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  };

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  let summary = <Redirect to="/" />;

  if (props.ings) {
    const purchasedRedirect = props.purchased ? (
      <Redirect to="/orders" />
    ) : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ings}
          onCheckoutCancelled={checkoutCancelledHandler}
          onCheckoutContinued={checkoutContinuedHandler}
        />
        <Route
          path={props.match.url + '/contact-data'}
          render={() => (
            <ContactData
              ingredients={props.ings}
              price={props.price}
              {...props}
            />
          )}
        />
      </div>
    );
  }

  return summary;
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.orders.purchased,
  };
};

export default connect(mapStateToProps)(withRouter(Checkout));
