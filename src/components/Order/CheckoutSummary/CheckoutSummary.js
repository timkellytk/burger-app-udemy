import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope you enjoy your burger!</h1>
      <div style={{ width: '100%', height: '300px', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.onCheckoutCancelled}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.onCheckoutContinued}>
        Checkout
      </Button>
    </div>
  );
};

export default CheckoutSummary;
