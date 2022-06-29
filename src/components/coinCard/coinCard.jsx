import React from 'react';
import css from './coinCard.module.css';

function CoinCard(props){
  return (
    <div className={css.coinCardBody}>
      <h1>{props.coinName}</h1>
      <img className={css.coinIcon} src={props.coinIcon} alt='Coin Icon'/>
    </div>
  );
};

export default CoinCard;