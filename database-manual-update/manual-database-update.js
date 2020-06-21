var fs = require('fs');
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'coviduser',
    host: 'localhost',
    database: 'covid',
    password: '&(co#83k38',
    port: 5432,
});

const response = JSON.parse(fs.readFileSync('./april/april-2-covid-update.json', 'utf8'));


const saveDistrictData = () => {
        const date = '2020-04-02';
            response.districts.forEach((district) => {
        const {
            numberOfConfirmedCases,
            numberOfConfirmedDeaths,
            numberOfRecoveredPatients,
            numberOfSuspectedCases,
            districtGeolocation,
            districtName
        } = district;

         const {lat, lng} = districtGeolocation;
        pool.query('INSERT INTO districtdata(districtGeolocationlat,districtGeolocationlng,districtName,numberOfConfirmedCases,numberOfConfirmedDeaths,numberOfRecoveredPatients,numberOfSuspectedCases, dateAdded) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [lat, lng, districtName, numberOfConfirmedCases, numberOfConfirmedDeaths, numberOfRecoveredPatients, numberOfSuspectedCases, date], (error, results) => {
            if (error) {
                throw error
            }

        })
            });
            
};
saveDistrictData();
