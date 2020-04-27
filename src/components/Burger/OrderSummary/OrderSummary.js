import React from 'react';

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((ingredient) => {
    const quantity = props.ingredients[ingredient];
    return quantity > 0 ? (
      <li key={ingredient}>
        <span style={{ textTransform: 'capitalize' }}>{ingredient}</span>:{' '}
        {quantity}
      </li>
    ) : null;
  });
  return (
    <React.Fragment>
      <h2>Your order summary</h2>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to checkout</p>
    </React.Fragment>
  );
};

export default OrderSummary;
