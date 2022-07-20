import React from 'react';
import css from './navbar.module.css';
import { useQuery } from 'react-query';
import { formatNumber } from '../../utils/formatNumbers';
import { SiGithub } from 'react-icons/si';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, BarElement, Filler } from 'chart.js';
import { Link } from 'react-router-dom';


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
          <h1>CryptoCurrency Project | <span style={{ color: '#00e0b8' }}>Statistics</span></h1>
          <Link to='/' className={css.navLink}>Home</Link>
          <a href='https://github.com/iancuvictor' className={css.navLink}>Source Code</a>
          <Link to='/login' className={css.loginButton}>Login</Link>
        </div>
      </div>

      <div className={css.bottom}>
        <div className={css.bottomContent}>
          <p>Coins:&nbsp;<span style={{ color: '#fff' }}>{formatNumber(data.data.totalCoins)}</span></p>
          <p>Markets:&nbsp;<span style={{ color: '#fff' }}>{formatNumber(data.data.totalMarkets)}</span></p>
          <p>24 Hour Volume:&nbsp;<span style={{ color: '#fff' }}>$ {formatNumber(data.data.total24hVolume)} USD</span></p>
          <p>Market Cap:&nbsp;<span style={{ color: '#fff' }}>$ {formatNumber(data.data.totalMarketCap)} USD</span></p>
          <p>Dominance:&nbsp;<span style={{ color: '#fff' }}>BTC {formatNumber(data.data.btcDominance)}%</span></p>
        </div>
      </div>
    </div>

  );
};

export default Navbar;