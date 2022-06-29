import React from 'react';
import css from './coinCard.module.css';

function CoinCard(props){
  return (
    <div className={css.coinCardBody}>
      <img className={css.coinIcon} src={props.coinIcon} alt='Coin Icon'/>
      <h1>{props.coinName}</h1>
    </div>
  );
};

export default CoinCard;