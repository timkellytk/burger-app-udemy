import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actionCreator from '../../store/actions/index';

class BurgerBuilder extends Component {
  state = {
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
    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

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
            purchasable={this.updatePurchaseState(this.props.ings)}
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
    onAddIngredient: (ingName) =>
      dispatch(actionCreator.addIngredient(ingName)),
    onRemoveIngredient: (ingName) =>
      dispatch(actionCreator.removeIngredient(ingName)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
