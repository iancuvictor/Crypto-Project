import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { formatNumber } from '../../utils/formatNumbers';
import css from './frontPage.module.css';

function FrontPage() {

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
        <div className={css.frontPage}>
            <div className={css.content}>
                <h1>The Future of Gambling is here,<br></br>And it's called Cryptocurrency<br></br>TRADING</h1>
                <p>Find data and statistics about Cryptocurrencies so you can have a<br></br>better understanding of what you will gamble your money on!</p>
                <Link to='/prices' className={css.linkButton}>Prices and Data</Link>
                <div className={css.showcaseData}>
                    <div className={css.tradeVolume}>
                        <p style={{ color: '#6861da' }}>24 Hour Volume</p>
                        <p style={{ color: '#9e9ea7' }}>$ {formatNumber(data.data.total24hVolume)}</p>
                    </div>

                    <div className={css.totalExchanges}>
                        <p style={{ color: '#01d3ae' }}>Total Exchanges</p>
                        <p style={{ color: '#9e9ea7' }}>{data.data.totalExchanges}</p>
                    </div>

                    <div className={css.marketCap}>
                        <p style={{ color: '#268bcd' }}>Market Cap</p>
                        <p style={{ color: '#9e9ea7' }}>$ {formatNumber(data.data.totalMarketCap)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FrontPage;