import { React } from 'react';
import { CoinCard } from '../exports';
import css from './resultsPage.module.css';
import { useQuery } from 'react-query';
import { options } from '../../utils/fetchApi';


function ResultsPage() {

    const { data, status } = useQuery('coins', () =>
        fetch('https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc', options)
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
        return <p>Loading...</p>
    }

    if (status === 'error') {
        return <p>An error happened, please stand by</p>
    }

    return (
        <div className={css.container}>
            {data.data.coins.map(function (coin) {
                return (
                    <CoinCard
                        coinName={coin.name}
                        coinIcon={coin.iconUrl}
                        symbol={coin.symbol}
                        price={Math.round(coin.price * 1000) / 1000}
                        rank={coin.rank}
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