const express = require('express');
const cors = require('cors');
const { getLocalCovidData, saveCountryData, saveDistrictData}   = require('./auto-queries.js');
const db  = require('./queries.js');
const cron = require('node-cron');
const app = express();
const port = 3001;

app.use(cors({origin: 'http://localhost:3000'}));
app.get('/api/confirmed', db.getCountryData);
app.get('/api/daily', db.getRecentCountryData);
app.get('/api/districts', db.getDistrictsData);
app.get('/api/districts/daily', db.getRecentDistrictsData);

/* 59 21 is 23:59 in malawi*/
cron.schedule("59 21 * * *", function() {   
saveCountryData();
saveDistrictData();
});

app.listen(port, () => console.log(`Covid API listening on ${port}!`));
