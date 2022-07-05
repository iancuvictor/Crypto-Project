import { React } from 'react';
import { CoinCard } from '../exports';
import css from './resultsPage.module.css';
import { useQuery } from 'react-query';
import { Line } from 'react-chartjs-2';
import { formatNumber } from '../../utils/formatNumbers';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, BarElement, Filler } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, BarElement, Filler);


function ResultsPage() {

    // fetch data from the api

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
    };

    let orderCriteria = 'marketCap'; // price marketCap 24hVolume change listedAt (posible options)

    const { data, status } = useQuery('coins', () =>

        fetch(`https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=${orderCriteria}&orderDirection=desc&limit=100`, options)
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
        <div className={css.container}>
            <div className={css.results}>
                <h1>Cryptocurrency Prices and Statistics</h1>
                <div className={css.coinDataResults}>
                    {data.data.coins.map(function (coin) {

                        // declarations

                        let labels = Array.from(coin.sparkline.keys());
                        let comparationResult;
                        let marketCapValue;

                        // Checks if the preLast change value is lower/higher than the last change value, then it displays a color accordingly. 

                        const isPositive = coin.change;

                        if (isPositive < 0) {
                            comparationResult = 'rgba(255,97,97'
                        } else {
                            comparationResult = 'rgba(24,224,138'
                        }

                        // ends here ^

                        // Check if marketCap value is null
                        if (coin.marketCap === null) {
                            marketCapValue = 'N/A';
                        } else {
                            marketCapValue = coin.marketCap;
                        }

                        return (
                            <CoinCard
                                coinName={coin.name}
                                coinIcon={coin.iconUrl}
                                symbol={coin.symbol}
                                price={(Math.round(coin.price * 100) / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                rank={coin.rank}
                                dailyChange={coin.change}
                                dailyVolume={formatNumber(coin['24hVolume'])}
                                marketCap={formatNumber(marketCapValue)}
                                chart={
                                    <Line
                                        data={{
                                            labels: labels,
                                            datasets: [{
                                                pointBorderColor: 'rgba(0,0,0,0)',
                                                label: 'My First Dataset',
                                                pointStyle: 'dash',
                                                data: coin.sparkline,
                                                backgroundColor: comparationResult + ',0.3)',
                                                fill: true,
                                                borderColor: comparationResult,
                                                borderWidth: 2,
                                                borderCapStyle: 'square',
                                                tension: 0
                                            }]
                                        }}
                                        options={{
                                            scales: {
                                                x: {
                                                    grid: {
                                                        display: false,
                                                        drawBorder: false
                                                    },
                                                    ticks: {
                                                        display: false
                                                    },
                                                },
                                                y: {
                                                    grid: {
                                                        display: false,
                                                        drawBorder: false
                                                    },
                                                    ticks: {
                                                        display: false
                                                    }
                                                },
                                            },
                                            legend: {
                                                display: false
                                            },
                                        }} />}
                                key={coin.uuid}
                            />
                        )
                    }
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResultsPage;