import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  meat: 2,
  cheese: 1,
  bacon: 1,
  salad: 0.5,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 5,
  };

  addIngredientHandler = (type) => {
    const count = this.state.ingredients[type];
    const updatedCount = count + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const price = this.state.price;
    const updatedPrice = price + INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
    });
  };

  removeIngredientHandler = (type) => {
    const count = this.state.ingredients[type];
    if (count > 0) {
      const updatedCount = count - 1;
      const updatedIngredients = { ...this.state.ingredients };
      updatedIngredients[type] = updatedCount;
      const price = this.state.totalPrice;
      const updatedPrice = price - INGREDIENT_PRICES[type];
      this.setState({
        ingredients: updatedIngredients,
        price: updatedPrice,
      });
    }
  };

  render() {
    const disabledIngredients = { ...this.state.ingredients };

    for (let key in disabledIngredients) {
      disabledIngredients[key] = disabledIngredients[key] <= 0;
    }

    return (
      <React.Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addedIngredient={this.addIngredientHandler}
          removedIngredient={this.removeIngredientHandler}
          disabled={disabledIngredients}
        />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
