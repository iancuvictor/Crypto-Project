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
          <h1>CryptoCurrency Project | <span style={{ color: '#9FA5BE' }}>Statistics</span></h1>
        <a href='https://github.com/iancuvictor'>
            <SiGithub className={css.navIcon} size={25}/>
        </a>
        </div>
      </div>

      <div className={css.bottom}>
        <div className={css.bottomContent}>
          <p>Coins:&nbsp;<span style={{ color: '#000' }}>{formatNumber(data.data.totalCoins)}</span></p>
          <p>Markets:&nbsp;<span style={{ color: '#000' }}>{formatNumber(data.data.totalMarkets)}</span></p>
          <p>24 Hour Volume:&nbsp;<span style={{ color: '#000' }}>$ {formatNumber(data.data.total24hVolume)} USD</span></p>
          <p>Market Cap:&nbsp;<span style={{ color: '#000' }}>$ {formatNumber(data.data.totalMarketCap)} USD</span></p>
          <p>Dominance:&nbsp;<span style={{ color: '#000' }}>BTC {formatNumber(data.data.btcDominance)}%</span></p>
        </div>
      </div>
    </div>

  );
};

export default Navbar;