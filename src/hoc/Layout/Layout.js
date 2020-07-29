import React, { useState } from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';
import { connect } from 'react-redux';

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const closeSideDrawerHandler = () => {
    setShowSideDrawer(false);
  };

  const openSideDrawerHandler = () => {
    setShowSideDrawer(true);
  };

  return (
    <React.Fragment>
      <Toolbar isAuth={props.isAuth} toggleClick={openSideDrawerHandler} />
      <SideDrawer
        isAuth={props.isAuth}
        closed={closeSideDrawerHandler}
        open={showSideDrawer}
      />
      <main className={classes.Content}>{props.children}</main>
    </React.Fragment>
  );
};

const mapStateToProps = (state, action) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
