const { pool } = require("./auto-queries.js");
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
                "SELECT number_of_confirmed_cases,number_of_confirmed_deaths,number_of_recovered_patients,number_of_suspected_cases,number_of_received_samples, number_of_tested_samples, date_added::date FROM nationaldata ORDER BY date_added ASC OFFSET (SELECT count(*) FROM nationaldata)-$1", [limit], (error, results) => {
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
      jsondata = JSON.stringify(camelcaseKeys(results.rows))
      data = JSON.parse(jsondata)
      districts = data.map(district => {
              const districtGeolocation = {
                          "lat": district.districtGeolocationlat,
                          "lng": district.districtGeolocationlng
                        }
              district['districtGeolocation'] = districtGeolocation;
              delete district.districtGeolocationlat;
              delete district.districtGeolocationlng;
              return district;
     })

      response.status(200).json(districts);
    }
  );
};

const getAllDistrictsData = (request, response) => {
  const limit = parseInt(request.params.id);
  pool.query(
    "SELECT district_geolocationlat,district_geolocationlng,district_name,number_of_confirmed_cases,number_of_confirmed_deaths,number_of_recovered_patients,number_of_suspected_cases, date_added  FROM districtdata GROUP BY date_added,  district_geolocationlat,district_geolocationlng,district_name,number_of_confirmed_cases,number_of_confirmed_deaths,number_of_recovered_patients,number_of_suspected_cases ORDER BY date_added DESC LIMIT $1", [limit],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(camelcaseKeys(results.rows));
    }
  );
};


module.exports = {
  getCountryData,
  getDistrictsData,
  getAllDistrictsData,
  getAllCountryData
};
