import React, { useState } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actionCreators from '../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = (props) => {
  const initialState = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: true,
  };

  const [auth, setAuth] = useState(initialState);

  if (!props.buildingBurger && props.authRedirectPath !== '/') {
    props.onSetAuthRedirectPath();
  }

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(auth.controls, {
      [controlName]: updateObject(auth.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          auth.controls[controlName].validation
        ),
        touched: true,
      }),
    });

    setAuth({ ...auth, controls: updatedControls });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(
      auth.controls.email.value,
      auth.controls.password.value,
      auth.isSignUp
    );
  };

  const switchAuthModeHandler = () => {
    setAuth((prevState) => ({ ...auth, isSignUp: !prevState.isSignUp }));
  };

  let formElementsArray = [];
  for (let key in auth.controls) {
    formElementsArray.push({
      id: key,
      config: auth.controls[key],
    });
  }

  let form = formElementsArray.map((element) => (
    <Input
      key={element.id}
      elementType={element.config.elementType}
      elementConfig={element.config.elementConfig}
      value={element.config.value}
      invalid={!element.config.valid}
      shouldValidate={element.config.validation}
      touched={element.config.touched}
      changed={(event) => inputChangedHandler(event, element.id)}
    />
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;

  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      <h1>{auth.isSignUp ? 'Sign Up' : 'Sign In'} To Order A Burger</h1>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">SUBMIT</Button>
      </form>
      <Button btnType="Danger" clicked={switchAuthModeHandler}>
        SWITCH TO {auth.isSignUp ? 'SIGN IN' : 'SIGN UP'}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirect,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actionCreators.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () =>
      dispatch(actionCreators.setAuthRedirectPath('/')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
