const axios = require("axios");

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'b2b76c8ec9mshe6c789928c5d6f7p12e8fajsn9cfa458b4e99',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});