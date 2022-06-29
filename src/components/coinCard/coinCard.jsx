import React from 'react';
import css from './coinCard.module.css';
import { AiFillDollarCircle } from 'react-icons/ai';

function CoinCard(props) {
  return (
    <div className={css.coinCardBody}>
      <div className={css.coin}>
        <img className={css.coinIcon} src={props.coinIcon} alt='Coin Icon' />
        <h1>{props.coinName} ({props.symbol})</h1>
      </div>
      <div className={css.price}>
        <AiFillDollarCircle size={25} />
        <p>{props.price}</p>
      </div>
      <p>{props.rank}</p>
    </div>
  );
};

export default CoinCard;