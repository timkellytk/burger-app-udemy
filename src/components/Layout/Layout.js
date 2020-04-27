import React from 'react';
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';
import classes from './Layout.module.css';

const layout = (props) => (
  <React.Fragment>
    <div>Toolbar, sidedrawer, backdrop</div>
    <BurgerBuilder />
    <main className={classes.Content}>{props.children}</main>
  </React.Fragment>
);

export default layout;
