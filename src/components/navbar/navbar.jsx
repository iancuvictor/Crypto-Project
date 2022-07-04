import React from 'react';
import css from './navbar.module.css';
import { useQuery } from 'react-query';
import { formatNumber } from '../../utils/formatNumbers';
import { SiGithub } from 'react-icons/si';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, BarElement, Filler } from 'chart.js';


Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, BarElement, Filler);

function Navbar(props) {

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };

  const { data, status } = useQuery('globData', () =>

    fetch('https://coinranking1.p.rapidapi.com/stats?referenceCurrencyUuid=yhjMzLPhuIDl', options)
      .then(res => res.json()
      ),
    {
      staleTime: 0,
      refetchOnWindowFocus: false,
      refetchInterval: 0
    }

  );
  console.log(data);

  // ### ends here ^ ###

  if (status === 'loading') {
    return (
      <div className={css.loadingScreen}>
        <h1>Loading</h1>
      </div>
    )
  }

  if (status === 'error') {
    return <p>While this is being fixed, you should go do some push-ups.</p>
  }

  return (
    <div className={css.navbarBody}>

      <div className={css.top}>
        <div className={css.topContent}>
        <h1>CryptoCurrency Project</h1>
        <a href='https://github.com/iancuvictor'>
          <SiGithub className={css.navIcon} size={25} />
        </a>
        </div>
      </div>

      <div className={css.bottom}>
        <div className={css.bottomContent}>
          <p>Coins: {formatNumber(data.data.totalCoins)}</p>
          <p>Markets: {formatNumber(data.data.totalMarkets)}</p>
          <p>24 Hour Volume: {formatNumber(data.data.total24hVolume)} USD</p>
          <p>Market Cap: $ {formatNumber(data.data.totalMarketCap)} USD</p>
          <p>Dominance: BTC {formatNumber(data.data.btcDominance)}%</p>
        </div>
      </div>
    </div>

  );
};

export default Navbar;