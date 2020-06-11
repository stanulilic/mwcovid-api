const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


const getLocalCovidData = async () => {
	try {
		// 
		const response = await axios({url:'https://covid19.health.gov.mw:3000/api/v0/aggregates',
			method: 'get',
		});
		const result = await response.data;
		return result 	}
	catch(error) {
		console.log(error);
	}
}
app.get('/', (req, res) => {
	getLocalCovidData().then((response) => {
	res.send(response);
	});
});

app.listen(port, () => console.log(`Covid API listening on ${port}!`));
