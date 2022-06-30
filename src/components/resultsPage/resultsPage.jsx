import { React } from 'react';
import { CoinCard } from '../exports';
import css from './resultsPage.module.css';
import { useQuery } from 'react-query';
import { Line } from 'react-chartjs-2';
import {
    Chart,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    BarElement,
    Filler,
} from 'chart.js'
Chart.register(
    LineController,
    LineElement,
    BarElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Filler,
)


function ResultsPage() {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
    };

    let orderCriteria = 'marketCap'; // price marketCap 24hVolume change listedAt

    const { data, status } = useQuery('coins', () =>

        fetch(`https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=${orderCriteria}&orderDirection=desc`, options)
            .then(res => res.json()
            ),
        {
            staleTime: 0,
            refetchOnWindowFocus: false,
            refetchInterval: 0
        }

    );
    console.log(data);

    if (status === 'loading') {
        return (
            <div className={css.loadingScreen}>
                <h1>Loading</h1>
            </div>
        )
    }

    if (status === 'error') {
        return <p>An error happened because I was drunk when I wrote this program. I am sorry. (the dev)</p>
    }

    return (
        <div className={css.container}>
            {data.data.coins.map(function (coin) {

                const isPositive = coin.change;
                let comparationResult;

                if (isPositive < 0) {
                    comparationResult = 'rgba(255,97,97'
                } else {
                    comparationResult = 'rgba(24,224,138'
                }

                return (
                    <CoinCard
                        coinName={coin.name}
                        coinIcon={coin.iconUrl}
                        symbol={coin.symbol}
                        price={(Math.round(coin.price * 100) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        rank={coin.rank}
                        dailyChange={coin.change}
                        dailyVolume={coin['24hVolume'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        marketCap={coin.marketCap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        chart={
                            <Line data={{
                                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
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
                            }} options={{
                                scales: {
                                    responsive: true,
                                    maintainAspectRatio: true,
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
    );


    // I will keep this code here as well because it serves as a good "tempalte" in case someone (for some reason) doesn't want to use react-query in their projects.
    // Basically almost everything from this point is "useless" code. =)

    {/*const [coins, setCoins] = useState([]);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'b2b76c8ec9mshe6c789928c5d6f7p12e8fajsn9cfa458b4e99',
                'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
            }
        };
        const fetchCoins = async () => {
            const response = await fetch('https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc', options);
            const coinsData = await response.json();
            setCoins(coinsData);
            console.log(coinsData);
            console.log(response);
        }

        fetchCoins();
    }, [])


    return (
        <div className={css.container}>
            {coins.data.coins.map(function (coin) {
                return (
                    <CoinCard coinName={coin.name} coinIcon={coin.iconUrl} key={coin.uuid} />
                )
            }
            )}
        </div>
        );*/}
};

export default ResultsPage;