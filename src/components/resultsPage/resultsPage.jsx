import { React, useState, useEffect } from 'react';
import { CoinCard } from '../exports';
import { axios } from 'axios';


function ResultsPage() {

    const [coins, setCoins] = useState([]);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'b2b76c8ec9mshe6c789928c5d6f7p12e8fajsn9cfa458b4e99',
                'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
            }
        };
        const fetchCoins = async () => {
            const response = await fetch('https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0', options);
            const coinsData = await response.json();
            setCoins(coinsData);
            console.log(coinsData);
        }

        fetchCoins();
    }, [])


    return (
        <div>
            {coins.data.coins.map(function (coin) {
                return (
                    <CoinCard coinName={coin.name} coinIcon={coin.iconUrl} key={coin.uuid} />
                )
            }
            )}
        </div>
    );
};

export default ResultsPage;