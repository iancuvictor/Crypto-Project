import React from 'react';
import css from './navbar.module.css';

function Navbar(props) {
  return (
    <div className={css.navbarBody}>
      <div className={css.top}>a</div>
      <div className={css.bottom}>
        <p>Coins: {props.totalCoins}</p>
        <p>Markets: {props.totalMarkets}</p>
        <p>24 Hour Volume: {props.totalVolume}</p>
        <p>Market Cap: {props.totalMarketCap}</p>
      </div>
    </div>
  );
};

export default Navbar;