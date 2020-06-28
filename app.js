const express = require('express');
const { getLocalCovidData, saveCountryData, saveDistrictData}   = require('./auto-queries.js');
const db  = require('./queries.js');
const cron = require('node-cron');
const app = express();
const port = 3001;


app.get('/', db.getCountryData);

cron.schedule("1 0 * * *", function() {   
saveCountryData();
saveDistrictData();
});

app.listen(port, () => console.log(`Covid API listening on ${port}!`));
