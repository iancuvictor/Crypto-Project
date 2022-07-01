import React from 'react';
import css from './coinCard.module.css';
import { AiFillDollarCircle } from 'react-icons/ai';

function CoinCard(props) {

  const isPositive = props.dailyChange;
  const hasMarketCap = props.marketCap;

  return (
    <div className={css.coinCardBody}>
      <p className={css.rank}>{props.rank}</p>
      <div className={css.coin}>
        <img className={css.coinIcon} src={props.coinIcon} alt='Coin Icon' />
        <p>{props.coinName} <span style={{ color: '#4D4E52'}}>({props.symbol})</span></p>
      </div>
      <div className={css.price}>
        <AiFillDollarCircle size={24} />
        <p>{props.price}</p>
      </div>
      <div className={css.dailyChange}>
        {isPositive > 0
          ? <p style={{ color: '#18E08A' }}>+{props.dailyChange}%</p>
          : <p style={{ color: '#D82F2F' }}>{props.dailyChange}%</p>
        }
      </div>
      <div className={css.dailyVolume}>
        <p>{props.dailyVolume}</p>
      </div>
      <div className={css.marketCap}>
        {hasMarketCap === 'No market cap!'
          ? <p style={{ color: '#D82F2F' }}>{props.marketCap}</p>
          : <p>{props.marketCap}</p>
        }
      </div>
      <div className={css.chart}>
        {props.chart}
      </div>
    </div>
  );
};

export default CoinCard;