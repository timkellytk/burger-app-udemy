import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as ActiveType from '../../store/action';

class BurgerBuilder extends Component {
  state = {
    totalPrice: 5,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    /*     axios
      .get('https://react-my-burger-fa2bc.firebaseio.com/ingredients.json')
      .then((response) => {
        this.setState({
          ingredients: response.data,
        });
      })
      .catch((error) => {
        this.setState({ error: true });
      }); */
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({
      purchasable: sum > 0,
    });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (const ingredient in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(ingredient) +
          '=' +
          encodeURIComponent(this.state.ingredients[ingredient])
      );
    }
    queryParams.push('price=' + this.props.price);
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString,
    });
  };
  /* 
  addIngredientHandler = (type) => {
    const count = this.state.ingredients[type];
    const updatedCount = count + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const price = this.state.totalPrice;
    const updatedPrice = price + INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
    });
    this.updatePurchaseState(updatedIngredients);
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
        totalPrice: updatedPrice,
      });
      this.updatePurchaseState(updatedIngredients);
    }
  }; */

  render() {
    const disabledIngredients = { ...this.props.ings };
    for (let key in disabledIngredients) {
      disabledIngredients[key] = disabledIngredients[key] <= 0;
    }

    let orderSummary = null;
    let burger = <Spinner />;

    if (this.state.error) {
      burger = <p>The ingredients can't be loaded</p>;
    }

    if (this.props.ings) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            addedIngredient={this.props.onAddIngredient}
            removedIngredient={this.props.onRemoveIngredient}
            disabled={disabledIngredients}
            price={this.props.price}
            purchasable={this.state.purchasable}
            purchased={this.purchaseHandler}
          />
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          removeModal={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingName, updatePurchaseState) =>
      dispatch({
        type: ActiveType.ADD_INGREDIENT,
        ingredientName: ingName,
        updatePurchaseState: updatePurchaseState,
      }),
    onRemoveIngredient: (ingName) =>
      dispatch({ type: ActiveType.REMOVE_INGREDIENT, ingredientName: ingName }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
