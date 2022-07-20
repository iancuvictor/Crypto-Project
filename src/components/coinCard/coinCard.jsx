import React from 'react';
import css from './coinCard.module.css';
//import { AiFillDollarCircle } from 'react-icons/ai';

function CoinCard(props) {

  const isPositive = props.dailyChange;
  const hasMarketCap = props.marketCap;

  return (
    <div className={css.coinCardBody}>
      <p className={css.rank}>{props.rank}</p>
      <div className={css.coin}>
        <img className={css.coinIcon} src={props.coinIcon} alt='Coin Icon' />
        <p>{props.coinName} <span style={{ color: '#929195'}}>({props.symbol})</span></p>
      </div>
      <div className={css.price}>
        <p>$ {props.price}</p>
        {isPositive > 0
          ? <p className={css.dailyChangePrice} style={{ color: '#35e18c' }}>+{props.dailyChange}%</p>
          : <p className={css.dailyChangePrice} style={{ color: '#D82F2F' }}>{props.dailyChange}%</p>
        }
      </div>
      <div className={css.dailyChange}>
        {isPositive > 0
          ? <p style={{ color: '#35e18c' }}>+{props.dailyChange}%</p>
          : <p style={{ color: '#d6393a' }}>{props.dailyChange}%</p>
        }
      </div>
      <div className={css.dailyVolume}>
        <p>$ {props.dailyVolume}</p>
      </div>
      <div className={css.marketCap}>
        {hasMarketCap === 'N/A'
          ? <p style={{ color: '#D82F2F' }}>$ {props.marketCap}</p>
          : <p>$ {props.marketCap}</p>
        }
      </div>
      <div className={css.chart}>
        {props.chart}
      </div>
    </div>
  );
};

export default CoinCard;