import React, { useState, useEffect, useCallback } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreator from '../../store/actions/index';

export const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();
  const onAddIngredient = (ingName) =>
    dispatch(actionCreator.addIngredient(ingName));
  const onRemoveIngredient = (ingName) =>
    dispatch(actionCreator.removeIngredient(ingName));
  const onInitIngredients = useCallback(
    () => dispatch(actionCreator.initIngredients()),
    [dispatch]
  );
  const onInitPurchase = () => dispatch(actionCreator.purchaseInit());
  const onSetAuthRedirectPath = (path) =>
    dispatch(actionCreator.setAuthRedirectPath(path));

  const ings = useSelector((state) => state.burgerBuilder.ingredients);
  const price = useSelector((state) => state.burgerBuilder.totalPrice);
  const error = useSelector((state) => state.burgerBuilder.error);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push('/checkout');
  };

  const disabledIngredients = { ...ings };
  for (let key in disabledIngredients) {
    disabledIngredients[key] = disabledIngredients[key] <= 0;
  }

  let orderSummary = null;
  let burger = <Spinner />;

  if (error) {
    burger = <p>The ingredients can't be loaded</p>;
  }

  if (ings) {
    burger = (
      <React.Fragment>
        <Burger ingredients={ings} />
        <BuildControls
          addedIngredient={onAddIngredient}
          removedIngredient={onRemoveIngredient}
          disabled={disabledIngredients}
          price={price}
          purchasable={updatePurchaseState(ings)}
          purchased={purchaseHandler}
          isAuth={isAuthenticated}
        />
      </React.Fragment>
    );
    orderSummary = (
      <OrderSummary
        ingredients={ings}
        price={price}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );
  }

  return (
    <React.Fragment>
      <Modal show={purchasing} removeModal={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </React.Fragment>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
