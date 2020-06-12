const express = require('express');
const { getLocalCovidData, saveCountryData}   = require('./auto-queries.js');
const cron = require('node-cron');
const app = express();
const port = 3001;


app.get('/', (req, res) => {
	getLocalCovidData().then((response) => {
	res.send(response);
	});
});
cron.schedule("1 0 * * *", function() {   
saveCountryData();
});

app.listen(port, () => console.log(`Covid API listening on ${port}!`));
