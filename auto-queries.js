const axios = require('axios');
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'coviduser',
    host: 'localhost',
    database: 'covid',
    password: '&(co#83k38',
    port: 5432,
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const getLocalCovidData = async () => {
    try {
        const response = await axios({
            url: 'https://covid19.health.gov.mw:3000/api/v0/aggregates',
            method: 'get',
        });
        const result = await response.data;
        return result
    } catch (error) {
        console.log(error);
    }
}

const getDistrictCovidData = async () => {
    try {
        const response = await axios({
                url: 'https://covid19.health.gov.mw:3000/api/v0/districts/aggregates',
            method: 'get',
        });
        const result = await response.data;
        return result
    } catch (error) {
        console.log(error);
    }
}


const saveCountryData = () => {
    getLocalCovidData().then((response) => {
        const {
            numberOfConfirmedCases,
            numberOfConfirmedDeaths,
            numberOfRecoveredPatients,
            numberOfSuspectedCases,
            numberOfReceivedSamples,
            numberOfTestedSamples
        } = response;
        pool.query('INSERT INTO nationaldata (numberOfConfirmedCases,numberOfConfirmedDeaths,numberOfRecoveredPatients,numberOfSuspectedCases,numberOfReceivedSamples,numberOfTestedSamples) VALUES ($1, $2, $3, $4, $5, $6)', [numberOfConfirmedCases, numberOfConfirmedDeaths,
            numberOfRecoveredPatients, numberOfSuspectedCases,
            numberOfReceivedSamples, numberOfTestedSamples
        ], (error, results) => {
            if (error) {
                throw error
            }

        })
    });
};

const saveDistrictData = () => {
    getDistrictCovidData().then((response) => {
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
        
        pool.query('INSERT INTO districtdata(districtGeolocationlat,districtGeolocationlng,districtName,numberOfConfirmedCases,numberOfConfirmedDeaths,numberOfRecoveredPatients,numberOfSuspectedCases) VALUES ($1, $2, $3, $4, $5, $6, $7)', [lat, lng, districtName, numberOfConfirmedCases, numberOfConfirmedDeaths, numberOfRecoveredPatients, numberOfSuspectedCases], (error, results) => {
            if (error) {
                throw error
            }

        })
            });
    });
};

module.exports = {
    saveCountryData,
    getLocalCovidData,
    saveDistrictData,
    pool,
};
