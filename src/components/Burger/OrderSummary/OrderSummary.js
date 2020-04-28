import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  componentWillUpdate() {
    console.log('[OrderSummary] will update');
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (ingredient) => {
        const quantity = this.props.ingredients[ingredient];
        return quantity > 0 ? (
          <li key={ingredient}>
            <span style={{ textTransform: 'capitalize' }}>{ingredient}</span>:{' '}
            {quantity}
          </li>
        ) : null;
      }
    );
    return (
      <React.Fragment>
        <h2>Your order summary</h2>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <strong>${this.props.price.toFixed(2)}</strong>
        <p>Continue to checkout</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          Continue
        </Button>
      </React.Fragment>
    );
  }
}

export default OrderSummary;
