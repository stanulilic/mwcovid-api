const { pool } = require("./auto-queries.js");
const {nestGeolocationData, toTitleCase} = require('./utils');
const camelcaseKeys = require('camelcase-keys');

const getCountryData = (request, response) => {
  pool.query(
    "SELECT * FROM nationaldata ORDER BY id DESC",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(camelcaseKeys(results.rows));
    }
  );
};

const getAllCountryData = (request, response) => {
        const limit = parseInt(request.params.id);

        pool.query(
                `SELECT number_of_confirmed_cases,number_of_confirmed_deaths,
                number_of_recovered_patients,number_of_suspected_cases,
                number_of_received_samples, number_of_tested_samples, date_added::date 
                FROM nationaldata 
                ORDER BY date_added 
                ASC OFFSET (SELECT count(*) FROM nationaldata)-$1`, [limit], (error, results) => {
                        if(error) {
                                throw error;
                        }
                        response.status(200).json(camelcaseKeys(results.rows));
                }
        );
}

const getDistrictsData = (request, response) => {
  pool.query(
    `SELECT district_geolocationlat,district_geolocationlng,district_name,number_of_confirmed_cases,number_of_confirmed_deaths,
          number_of_recovered_patients,number_of_suspected_cases, date_added
          FROM districtdata 
          WHERE date_added::date=(SELECT MAX(date_added) from districtdata) 
          GROUP BY date_added,  district_geolocationlat,district_geolocationlng,district_name,number_of_confirmed_cases,
          number_of_confirmed_deaths,number_of_recovered_patients, number_of_suspected_cases 
          ORDER BY date_added desc;`,
    (error, results) => {
      if (error) {
        throw error;
      }
      districts = nestGeolocationData(results.rows) 
       response.status(200).json(districts);
    }
  );
};

const getDataByDistrictName = (request, response) => {
  const district_param = request.params.district_name;
  const district_name = toTitleCase(district_param);
  pool.query(
    `SELECT district_geolocationlat,district_geolocationlng,district_name,
          number_of_confirmed_cases,number_of_confirmed_deaths,
          number_of_recovered_patients,number_of_suspected_cases, date_added 
          FROM districtdata 
          WHERE date_added::date=(SELECT MAX(date_added) from districtdata) 
          AND district_name = $1 
          GROUP BY date_added,  district_geolocationlat,district_geolocationlng,
          district_name,number_of_confirmed_cases,number_of_confirmed_deaths,
          number_of_recovered_patients,number_of_suspected_cases
          ORDER BY date_added desc;
          `, [district_name],
    (error, results) => {
      if (error) {
        throw error;
      }
      districts = nestGeolocationData(results.rows) 
      response.status(200).json(districts);
    }
  );
};

const getAllDataByDistrictName = (request, response) => {
  const district_param = request.params.district_name;
  const district_name = toTitleCase(district_param);
  pool.query(
    `SELECT district_geolocationlat,district_geolocationlng,district_name,
          number_of_confirmed_cases,number_of_confirmed_deaths,
          number_of_recovered_patients,number_of_suspected_cases, date_added 
          FROM districtdata 
          WHERE district_name = $1 
          GROUP BY date_added,  district_geolocationlat,district_geolocationlng,
          district_name,number_of_confirmed_cases,number_of_confirmed_deaths,
          number_of_recovered_patients,number_of_suspected_cases
          ORDER BY date_added desc;
          `, [district_name],
    (error, results) => {
      if (error) {
        throw error;
      }
      districts = nestGeolocationData(results.rows) 
      response.status(200).json(districts);
    }
  );
};



module.exports = {
  getCountryData,
  getDistrictsData,
  getDataByDistrictName,
  getAllDataByDistrictName,
  getAllCountryData
};
